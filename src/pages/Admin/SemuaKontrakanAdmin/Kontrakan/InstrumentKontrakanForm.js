import React from 'react';
import { Box, Text, Editable, EditablePreview, EditableInput, Flex, Input } from '@chakra-ui/core';
import moment from 'moment';

const InstrumentKontrakan = ({ data, dataSet }) => {
    const changeData = (e, type) => {
        dataSet(prev => {
            return {
                ...prev,
                [type]: e
            }
        })
    }



    return (
        <Box width={['300px', '300px', '35%']} padding='20px 0' margin='0 auto'>
            <Box width='100%' bg='#fff' boxShadow='0px 0px 3px rgba(0,0,0,.1)' borderRadius='10px' padding='20px 20px 40px 20px' position='relative'>
                <Text fontFamily='nunito' fontSize='xl' fontWeight='bold'>Data Pemilik</Text>

                <Editable my='2' fontWeight='bold' fontFamily='nunito' defaultValue={data.namaPemilikKontrakan} value={data.namaPemilikKontrakan} onChange={e => changeData(e, 'namaPemilikKontrakan')} placeholder='Nama Pemilik'>
                    <EditablePreview />
                    <EditableInput />
                </Editable>

                <Flex alignItems='center'>
                    <Text mr='2' fontFamily='nunito' fontSize='sm'>+62</Text>
                    <Input fontWeight='bold' fontFamily='nunito' defaultValue={data.nomorPemilikKontrakan} value={data.nomorPemilikKontrakan}
                        onChange={e => {
                            if ((e.target.value === '0' && data.nomorPemilikKontrakan === null) || (e.target.value === '0' && data.nomorPemilikKontrakan.length === 0)) {
                                changeData("", 'nomorPemilikKontrakan');
                            } else {
                                changeData(e.target.value.replace(/[^0-9.]/g, ""), 'nomorPemilikKontrakan');
                            }
                        }} placeholder='Nomor Pemilik' />
                </Flex>

                <Text display='flex' justifyContent='space-between' fontFamily='nunito' fontSize={['2xl', '2xl', 'lg', '2xl']} my='50px' fontWeight='bold'>Rp <Input width='150px' placeholder='Harga' value={data.hargaKontrakan} type='number'
                    onChange={e => {
                        changeData(parseInt(e.target.value.replace(/[^0-9.]/g, "")), "hargaKontrakan");
                    }} /> / Bulan</Text>
                <Text position='absolute' bottom='20px' fontFamily='nunito' color='#999' fontSize='10px'>{moment(data.publishDate, "YYYYMMDD").fromNow()}</Text>
            </Box>
        </Box>
    );
}

export default InstrumentKontrakan;

