import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { Box, Image, Text, } from '@chakra-ui/core';
import HeaderImage from '../../assets/search-kontrakan.jpg';
import Axios from 'axios';
import { connect } from 'react-redux';
import ShowUnit from '../Home/ShowUnit';
import qs from 'qs';
import emptyImage from '../../assets/empty.jpg';



const CariKontrakan = (props) => {
    const { ShowAlertSet, restApi } = props;

    useEffect(() => {
        Axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
            .then(res => {
                provinsiSet(res.data.provinsi);
            })
            .catch(err => {
                Alerting(err.message, 'error')
            })

        let initHarga = [];
        let initIndex = 0;
        let increaseIndex = 1000000;
        for (let i = 1; i <= 18; i++) {
            if (i === 11) increaseIndex += 4000000;
            initIndex += increaseIndex;
            initHarga.push(initIndex);
        }
        dariHargaSet(initHarga)
        keHargaSet(initHarga)

        const propsFromHome = props.location.lokasi;
        if (propsFromHome !== undefined) {
            provinsiDipilihSet(propsFromHome.provinsi)
            fetchKota(propsFromHome.idProvinsi);
            kotaDipilihSet(propsFromHome.kota === 'Kota Jakarta' ? 'Kota Jakarta Pusat' : propsFromHome.kota);
        }
    }, [])

    const Alerting = (msg, severity) => {
        ShowAlertSet(true, msg, severity);
        setTimeout(() => {
            ShowAlertSet(false, '', '')
        }, 2000);
    }


    const [provinsi, provinsiSet] = useState([]);
    const [kota, kotaSet] = useState([]);
    const kt = [1, 2, 3, 4, 5, 6];
    const km = [1, 2, 3, 4, 5, 6];
    const [dariHarga, dariHargaSet] = useState([])
    const [keHarga, keHargaSet] = useState([])

    const [provinsiDipilihBuatJudul, provinsiDipilihBuatJudulSet] = useState('');
    const [kotaDipilihBuatJudul, kotaDipilihBuatJudulSet] = useState('semua');

    const [provinsiDipilih, provinsiDipilihSet] = useState('');
    const [kotaDipilih, kotaDipilihSet] = useState('semua');
    const [ktDipilih, ktDipilihSet] = useState('semua');
    const [kmDipilih, kmDipilihSet] = useState('semua');
    const [dariHargaDipilih, dariHargaDipilihSet] = useState('semua');
    const [keHargaDipilih, keHargaDipilihSet] = useState('semua');

    const [search_data, search_dataSet] = useState([]);
    const [isEmpty, isEmptySet] = useState(false);

    const [loadingBtn, loadingBtnSet] = useState(false);

    const changeProvinsi = e => {
        provinsiDipilihSet(e);
        if (e !== '') {
            const id = provinsi.filter(item => item.nama === e);
            fetchKota(id[0].id)
        } else {
            kotaDipilihSet('');
        }
    }

    const CARI_KONTRAKAN = () => {
        if (provinsiDipilih === '') return Alerting('Provinsi wajib diisi!', 'warning');
        // console.log({
        //     dariHargaKontrakan: dariHargaDipilih,
        //     keHargaKontrakan: keHargaDipilih,            
        // })

        loadingBtnSet(true);

        const datanya = kotaDipilih === 'semua' ? {
            provinsi: provinsiDipilih,
            KT: ktDipilih,
            KM: kmDipilih,
        } : {
                provinsi: provinsiDipilih,
                kotaKabupaten: kotaDipilih,
                KT: ktDipilih,
                KM: kmDipilih,
            }
        provinsiDipilihBuatJudulSet(provinsiDipilih);
        kotaDipilihBuatJudulSet(kotaDipilih);

        Axios({
            method: 'post',
            url: `${restApi}/kontrakan/filter/search`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify(datanya)
        })
            .then(res => {
                if (res.data.data.length === 0) {
                    isEmptySet(true);
                    search_dataSet([]);
                }
                if (dariHargaDipilih !== 'semua') {
                    const cloned = [...res.data.data];
                    if (dariHargaDipilih === 'lebih') {
                        const lebihna = cloned.filter(item => parseInt(item.hargaKontrakan) >= 50000000);
                        search_dataSet(lebihna);
                        if (lebihna.length === 0) return isEmptySet(true);
                    }
                    else if (dariHargaDipilih === 'kurang') {
                        const kurangna = cloned.filter(item => parseInt(item.hargaKontrakan) <= 1000000);
                        search_dataSet(kurangna);
                        console.log(kurangna)
                        if (kurangna.length === 0) return isEmptySet(true);
                    }
                    else {
                        const pilter = cloned.filter(item => parseInt(item.hargaKontrakan) >= parseInt(dariHargaDipilih));
                        search_dataSet(pilter);
                        if (pilter.length === 0) return isEmptySet(true);
                    }
                } else {
                    search_dataSet(res.data.data);
                    // console.log(res.data.data)
                }
                loadingBtnSet(false);
            })
            .catch(err => {
                Alerting(err.message, 'error');
                loadingBtnSet(false);
            })
    }

    const fetchKota = id => {
        Axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`)
            .then(res => {
                kotaSet(res.data.kota_kabupaten);
            })
            .catch(err => {
                Alerting(err.message, 'error')
            })
    }

    return (
        <Box minHeight='100vh' paddingX={['20px', '50px', '100px']} paddingTop='100px' display='flex' flexDir='column' alignItems='center'>
            <SearchBar
                kota={kota} kt={kt} km={km} dariHarga={dariHarga} keHarga={keHarga} provinsi={provinsi}
                provinsiDipilih={provinsiDipilih} kotaDipilih={kotaDipilih} kotaDipilihSet={e => kotaDipilihSet(e)}
                ktDipilih={ktDipilih} ktDipilihSet={e => ktDipilihSet(e)} kmDipilih={kmDipilih} kmDipilihSet={e => kmDipilihSet(e)}
                dariHargaDipilih={dariHargaDipilih} dariHargaDipilihSet={e => dariHargaDipilihSet(e)} keHargaDipilih={keHargaDipilih}
                keHargaDipilihSet={e => keHargaDipilihSet(e)} changeProvinsi={e => changeProvinsi(e.target.value)} CARI_KONTRAKAN={CARI_KONTRAKAN}
                loadingBtn={loadingBtn}
            />

            {search_data.length !== 0 ? <ShowUnit data={search_data} title={`Pencarian untuk ${kotaDipilihBuatJudul === 'semua' ? 'Semua Kota di' : kotaDipilihBuatJudul + ', '} ${provinsiDipilihBuatJudul}`} />
                :
                isEmpty ?
                    <Box width={['400px', '40%', '30%']} marginTop='50px' alignSelf='center'>
                        <Image src={emptyImage} width={'100%'} />
                        <Text textAlign='center' fontFamily='nunito' fontSize='12px' fontWeight='lighter'>Tidak ada kontrakan yang ditemukan :(</Text>
                    </Box>
                    :
                    <Box width={['400px', '40%', '30%']} marginTop='50px' alignSelf='center'>
                        <Image src={HeaderImage} width={'100%'} />
                        <Text textAlign='center' fontFamily='nunito' fontSize='12px' fontWeight='lighter'>Cari kontrakan impian mu yuk!</Text>
                    </Box>}
        </Box>
    );
}

const storeToProps = state => {
    return {
        restApi: state.restApi
    }
}

const dispatchToStore = dispatch => {
    return {
        ShowAlertSet: (show, msg, severity) => dispatch({ type: 'ShowAlertSet', show, msg, severity })
    }
}


export default connect(storeToProps, dispatchToStore)(CariKontrakan);