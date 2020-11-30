import React, { useState } from 'react';
import { Box, Text, Button, useDisclosure, Flex } from '@chakra-ui/core';
import QRCode from 'qrcode.react';
import { AiOutlineQrcode, AiOutlineHeart, AiFillHeart, AiOutlineNumber } from 'react-icons/ai';
import { FaRegBuilding } from 'react-icons/fa';
import { FaBed, FaBath } from 'react-icons/fa'
import MyModal from '../../components/MyComponents/MyModal';
import Axios from 'axios';
import qs from 'qs';

const DashboardKontrakan = ({ data, userData, isAuth, onOpenLogin, Alerting, restApi, id, cbFetch }) => {
    const [qrcodePathname, qrcodePathnameSet] = useState('');
    const { isOpen, onClose, onOpen } = useDisclosure();

    const SIMPAN = () => {
        Axios({
            method: 'post',
            url: `${restApi}/kontrakan/${id}/favorite`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify({ uid: userData.uid })
        })
            .then(res => {
                Alerting(res.data.data.message, 'success');
                cbFetch()
            })
            .catch(err => {
                Alerting(err.message, 'error');
            })
    }
    return (
        <>
            <Box width={['100%', '100%', '65%']}>
                <Text mt='4' fontSize='2rem' fontWeight='bold' fontFamily='overlock'>{data.namaKontrakan}</Text>
                <Text fontFamily='nunito' color='#999999'>{data.alamat} {data.kelurahan} {data.kecamatan}</Text>

                <Box mt='4'>
                    <Button
                        onClick={() => {
                            if (!isAuth) return onOpenLogin();
                            SIMPAN();
                        }}
                        mr='4'
                        variant='outline' color='#000' bg='#fff' fontSize='2xl' _hover={{ transform: 'scale(.95)' }}>
                        {data.disimpanUser.includes(userData.uid) ? <AiFillHeart fill='#b93333' /> : <AiOutlineHeart fill='#999' />}<Text ml='4' style={{ color: data.disimpanUser.includes(userData.uid) ? '#b93333' : '#999' }} fontSize='sm' fontFamily='nunito'>{data.disimpanUser.length} Disimpan</Text></Button>

                    <Button
                        onClick={() => {
                            qrcodePathnameSet(data.idKontrakan);
                            onOpen();
                        }}
                        variant='outline' color='#000' bg='#fff' fontSize='2xl' _hover={{ transform: 'scale(.95)' }}><AiOutlineQrcode fill='#999' /> <Text ml='4' fontSize='sm' fontFamily='nunito' color='#999' >QR CODE</Text></Button>
                </Box>

                <Box mt='50px'>
                    <Text fontFamily='nunito' color='#999' fontWeight='bold'>Detail Kontrakan</Text>

                    <Flex
                        width='100%'
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="12px"
                        flexWrap='wrap'
                        justifyContent={['space-between', 'flex-start']}
                    >
                        <Flex mr='2' alignItems='center'><FaBed fill='#999' /><Text ml='1' fontFamily='nunito'>{data.KT} Kamar Tidur</Text></Flex>

                        <Flex ml='2' mr='2' width={['50%', 'auto']} alignItems='center'><FaBath fill='#999' /><Text ml='1' fontFamily='nunito'>{data.KM} Kamar Mandi</Text></Flex>

                        <Flex mr='2' ml={['0', '2']} alignItems='center'><FaRegBuilding fill='#999' /><Text ml='1' fontFamily='nunito'>Luas Bangunan {data.luasBangunan}&#13217;</Text></Flex>

                        <Flex ml='2' mr='2' width={['50%', 'auto']} alignItems='center'><AiOutlineNumber fill='#999' /> <Text ml='1' fontFamily='nunito'>Luas Tanah {data.luasTanah}&#13217;</Text></Flex>
                    </Flex>
                </Box>

                <Box mt='50px' width={['100%', '100%', '100%']} pr='20px'>
                    <Text fontFamily='nunito' color='#999' fontWeight='bold'>Deskripsi Kontrakan</Text>
                    <Text fontFamily='nunito' color='#999'>{data.deskripsiKontrakan}</Text>
                </Box>
            </Box>

            <MyModal isOpen={isOpen} onClose={onClose} title='QR CODE'>
                <QRCode value={`${window.location.host}/kontrakan/${qrcodePathname}`} />
            </MyModal>
        </>
    );
}



export default DashboardKontrakan;