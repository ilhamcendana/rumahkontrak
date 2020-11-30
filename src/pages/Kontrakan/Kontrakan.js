import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/core';
import GambarKontrakan from './GambarKontrakan';
import DashboardKontrakan from './DashboardKontrakan';
import { connect } from 'react-redux';
import InstrumentKontrakan from './InstrumentKontrakan';
import ShowUnit from '../Home/ShowUnit';
import MyButton from '../../components/MyComponents/MyButton';
import Ulasan from './Ulasan';
import Axios from 'axios';
import qs from 'qs'
import { useState } from 'react';

const data1 = [
    {
        idKontrakan: '123',
        namaKontrakan: 'Rumah Uya',
        urlGambarKontrakan: ['https://placeimg.com/640/480/arch', 'https://placeimg.com/640/480/nature'],
        deskripsiKontrakan: 'Ini rumah sedap bat dah',
        hargaKontrakan: 35000000,
        provinsi: 'Jawa Barat',
        kotaKabupaten: 'Depok',
        kelurahan: 'Tirtajaya',
        kecamatan: 'Sukmajaya',
        alamat: 'Cluster Anggrek Blok W18, Grand Depok City',
        publishDate: new Date(),
        KT: 3,
        KM: 2,
        luasBangunan: 3.5,
        luasTanah: 100,
        namaPemilikKontrakan: 'Sunyoto',
        nomorPemilikKontrakan: 82212547786,
        disimpanUser: ['woyAtdhWMzbpOhhkcq9cmk0L2zJ2'],
        status: '0',
        publish: '1'
    },
]



const Kontrakan = (props) => {
    const { Alerting, restApi, userData } = props;
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [lamaSewa, lamaSewaSet] = useState(0);
    const [btnLoading, btnLoadingSet] = useState(false);

    useEffect(() => {
        fetchKontrakan()
    }, [])

    const fetchKontrakan = () => {
        Axios.get(`${restApi}/kontrakan/${id}`)
            .then(res => {
                dataSet(prev => {
                    return {
                        ...prev,
                        ...res.data.data
                    }
                });
            })
            .catch(err => {
                Alerting(err.message, 'error');
            })
    }

    const [data, dataSet] = useState({
        idKontrakan: '',
        namaKontrakan: '',
        urlGambarKontrakan: [],
        deskripsiKontrakan: '',
        hargaKontrakan: 0,
        provinsi: '',
        kotaKabupaten: '',
        kelurahan: '',
        kecamatan: '',
        alamat: '',
        publishDate: new Date(),
        KT: 0,
        KM: 0,
        luasBangunan: 0,
        luasTanah: 0,
        namaPemilikKontrakan: '',
        nomorPemilikKontrakan: 0,
        disimpanUser: [''],
        gmaps: ``,
        ulasan: [
            {
                uid: '123',
                rating: 1,
                displayName: 'IlhamCendana',
                komentar: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam velit, non veritatis voluptatum fugit placeat, deserunt recusandae sapiente a et illum dolorem ipsa maxime. Ex deserunt aliquid placeat autem quisquam.'
            },
            {
                uid: '123',
                rating: 3,
                displayName: 'Cen',
                komentar: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam velit, non veritatis voluptatum fugit placeat, deserunt recusandae sapiente a et illum dolorem ipsa maxime. Ex deserunt aliquid placeat autem quisquam.'
            },
        ]
    })

    const SEWA = () => {
        btnLoadingSet(true);
        Axios({
            method: 'post',
            url: `${restApi}/kontrakan/${id}/ambil`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify({ uid: userData.uid, lamaSewa: lamaSewa })
        })
            .then(() => {
                Alerting('Kontrakan berhasil dibooking, silahkan lanjutkan mengirim bukti pembayaran pada halaman transaksi', 'success');
                btnLoadingSet(false);
            })
            .catch(err => {
                Alerting(err.message, 'error');
                btnLoadingSet(false);
            })
    }

    return (
        <>
            <Box paddingX={['20px', '50px', '100px']} paddingTop='100px' minHeight='100vh' marginBottom='100px'>
                <GambarKontrakan UrlGambarKontrakan={data.urlGambarKontrakan} text='as' />
                <Flex flexDirection={['column', 'column', 'row']} justifyContent='space-between' width='100%'>
                    <DashboardKontrakan data={data} userData={props.userData} onOpenLogin={props.onOpenLogin} isAuth={props.isAuth} restApi={restApi} Alerting={Alerting} id={id} cbFetch={fetchKontrakan} />
                    <InstrumentKontrakan data={data} onOpenLogin={props.onOpenLogin} isAuth={props.isAuth} onOpen={onOpen} />
                </Flex>

                <Flex mt='100px' justifyContent='space-between' alignItems='center'>
                    <Ulasan data={data.ulasan} restApi={restApi} isAuth={props.isAuth} onOpenLogin={props.onOpenLogin} userData={userData} Alerting={Alerting} id={id} cbFetch={fetchKontrakan} />

                    <Box dangerouslySetInnerHTML={{ __html: data.gmaps }} width={['100%', '49%']} height='470px' />
                </Flex>

                <ShowUnit title={`Kontrakan lainnya di ${data.kotaKabupaten}`} data={data1} />
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sebelum pesanan dibuat</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Flex justifyContent='space-between' alignItems='center'>
                            <Text fontSize='md' fontFamily='nunito'>Anda ingin menyewa kontrakan ini selama</Text>

                            <Flex alignItems='center'>
                                <NumberInput defaultValue={lamaSewa} onChange={e => lamaSewaSet(e)} min={1} max={5} width='100px' mr='2'>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Text fontSize='md' fontFamily='nunito'>Bulan</Text>
                            </Flex>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <MyButton isLoading={btnLoading} color='#fff' mr={3} onClick={onClose}>
                            Tutup
                        </MyButton>
                        <MyButton isLoading={btnLoading} onClick={SEWA} variant="ghost" borderWidth='1px' borderColor='primary'>Sewa kontrakan ini</MyButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

const storeToProps = state => {
    return {
        userData: state.userData,
        isAuth: state.isAuth,
        restApi: state.restApi
    }
}

export default connect(storeToProps)(Kontrakan);