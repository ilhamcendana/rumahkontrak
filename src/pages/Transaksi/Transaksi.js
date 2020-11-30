import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/core';
import Axios from 'axios';
import { connect } from 'react-redux';
import MyButton from '../../components/MyComponents/MyButton';
import { useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import qs from 'qs';

const Transaksi = ({ restApi, userData, Alerting }) => {
    useEffect(() => {
        fetchTransaksi();
    }, [])

    const fetchTransaksi = () => {
        Axios.get(`${restApi}/users/${userData.uid}/transaksi`)
            .then(async res => {
                const sampleTransaksi = [...res.data.data];
                const buckets = [];

                for (let i = 0; i <= sampleTransaksi.length - 1; i++) {
                    await Axios.get(`${restApi}/kontrakan/${sampleTransaksi[i].idKontrakan}`)
                        .then(ress => {
                            let sampleed = { ...ress.data.data };
                            sampleed.lamaSewa = sampleTransaksi[i].lamaSewa;
                            sampleed.buktiPembayaran = sampleTransaksi[i].buktiPembayaran;
                            buckets.push(sampleed);
                        })
                        .catch(err => {
                            console.log(err.message);
                        })
                }
                transaksiDataSet(buckets);
                console.log(buckets);
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const myRef = useRef(null);
    const [transaksiData, transaksiDataSet] = useState([]);
    const [bukti, buktiSet] = useState(null);
    const [btnLoading, btnLoadingSet] = useState(false);

    const UPLOAD_BUKTI = async (id) => {
        btnLoadingSet(true);
        await firebase.storage().ref(`bukti-transfer/${userData.uid}/${id}/${bukti.name}`).put(bukti)
            .then(ref => ref.ref.getDownloadURL()
                .then(async url => {
                    await Axios({
                        method: 'post',
                        url: `${restApi}/users/${userData.uid}/transaksi/${id}/uploadbukti`,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: qs.stringify({ buktitf: url })
                    })
                        .then(() => {
                            fetchTransaksi();
                            Alerting('Bukti berhasil dikirim', 'success')
                            btnLoadingSet(false);
                        })
                })
                .catch(err => {
                    Alerting(err.message, 'error')
                    btnLoadingSet(false);
                }))
    }
    return (
        <Flex paddingX={['20px', '50px', '100px']} paddingTop='100px' minH='100vh' justifyContent='space-between' alignItems='center'>
            {transaksiData.map(item => (
                <Box width={['100%', '49%']} height='550px' boxShadow='0px 2px 3px rgba(0,0,0,.1)' key={item.idKontrakan} >
                    <Image src={item.urlGambarKontrakan[0]} width='100%' height='300px' />
                    <Box padding='10px'>
                        <Text fontWeight='bold' fontFamily='nunito' fontSize='xl'>{item.namaKontrakan}</Text>
                        <Text fontFamily='nunito' >{item.namaPemilikKontrakan}</Text>
                        <Text fontFamily='nunito' >{item.nomorPemilikKontrakan}</Text>
                        <Text fontFamily='nunito' >Rp {item.hargaKontrakan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} X {item.lamaSewa} Tahun = <span style={{ fontWeight: 'bolder' }}> Rp {(parseInt(item.hargaKontrakan) * parseInt(item.lamaSewa)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span> yang harus dibayarkan</Text>

                        {item.buktiPembayaran === '' ? <MyButton isLoading={btnLoading} onClick={() => myRef.current.click()} mt='20px'>Upload bukti pembayaran</MyButton> : <Text mt='20px' color='#94d494' background='green' padding='10px' fontFamily='nunito'>Sudah dibayar</Text>}
                        {bukti !== null && item.buktiPembayaran === '' ? <MyButton isLoading={btnLoading} mt='20px' ml='20px' onClick={() => UPLOAD_BUKTI(item.idKontrakan)}>Upload</MyButton> : null}
                        <input onChange={(e) => buktiSet(e.target.files[0])} type="file" ref={myRef} style={{ display: 'none' }} />
                    </Box>
                </Box>
            ))}
        </Flex>
    );
}

const storeToProps = state => {
    return {
        userData: state.userData,
        restApi: state.restApi
    }
}

export default connect(storeToProps)(Transaksi);