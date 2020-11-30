import React from 'react';
import { Box, Text } from '@chakra-ui/core';
import MyButton from '../../components/MyComponents/MyButton';
import moment from 'moment'

const InstrumentKontrakan = ({ data, onOpenLogin, isAuth, onOpen }) => {

    return (
        <Box width={['300px', '300px', '35%']} padding='20px 0' margin='0 auto'>
            <Box width='100%' bg='#fff' boxShadow='0px 0px 3px rgba(0,0,0,.1)' borderRadius='10px' padding='20px 20px 40px 20px' position='relative'>
                <Text fontFamily='nunito' fontSize='xl' fontWeight='bold'>Data Pemilik</Text>
                <Text fontFamily='nunito' fontSize='sm'>{data.namaPemilikKontrakan}</Text>
                <Text fontFamily='nunito' fontSize='sm'>+62{data.nomorPemilikKontrakan}</Text>
                <Text fontFamily='nunito' fontSize={['2xl', '2xl', 'lg', '2xl']} my='50px' fontWeight='bold'>Rp {data.hargaKontrakan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} / Bulan</Text>
                <Text position='absolute' bottom='20px' fontFamily='nunito' color='#999' fontSize='10px'>{moment(data.publishDate, "YYYYMMDD").fromNow()} </Text>

                <MyButton mb='30px' width='100%' onClick={() => {
                    if (!isAuth) return onOpenLogin();
                    onOpen();
                }}>Sewa Kontrakan</MyButton>
            </Box>
        </Box>
    );
}

export default InstrumentKontrakan;