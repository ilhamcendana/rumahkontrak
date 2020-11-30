import React from 'react';
import { Select, Flex, Box, Text } from '@chakra-ui/core';
import MyButton from '../../components/MyComponents/MyButton';

const SearchBar = (props) => {
    const {
        kota, kt, km, dariHarga,
        provinsiDipilih, kotaDipilih,
        ktDipilih, ktDipilihSet, kmDipilih, kmDipilihSet,
        dariHargaDipilih, dariHargaDipilihSet,
        keHargaDipilihSet, changeProvinsi, kotaDipilihSet, provinsi, CARI_KONTRAKAN, loadingBtn
    } = props;

    return (
        <Flex flexDir='column' alignItems='flex-end'>
            <Flex justifyContent='space-between' background='#fff' padding='20px' borderRadius='20px' boxShadow='1px 1px 10px rgba(0,0,0,.1)' flexDir={['column', 'column', 'row']}>
                <Box width={['100%', '100%', '23%']}>
                    <Text fontFamily='nunito' fontSize='12px' fontWeight='lighter'>Provinsi(*)</Text>
                    <Select fontFamily='nunito' value={provinsiDipilih} onChange={e => changeProvinsi(e)} marginBottom={['20px', '20px', '0px']} placeholder="Provinsi" >
                        {provinsi.map(item => <option key={item.id} value={item.nama}>{item.nama}</option>)}
                    </Select>
                </Box>

                <Box width={['100%', '100%', '23%']}>
                    <Text fontFamily='nunito' fontSize='12px' fontWeight='lighter'>Kota</Text>
                    <Select isDisabled={provinsiDipilih === ''} value={kotaDipilih} onChange={e => kotaDipilihSet(e.target.value || 'semua')} fontFamily='nunito' marginBottom={['20px', '20px', '0px']} placeholder="Semua Kota" >
                        {kota.map(item => <option key={item.id} value={item.nama}>{item.nama}</option>)}
                    </Select>
                </Box>

                <Box width={['100%', '100%', '13%']}>
                    <Text fontFamily='nunito' fontSize='12px' fontWeight='lighter'>Kamar Tidur</Text>
                    <Select value={ktDipilih} onChange={e => ktDipilihSet(e.target.value || 'semua')} fontFamily='nunito' marginBottom={['20px', '20px', '0px']} placeholder="Semua" >
                        {kt.map(item => (
                            <option key={item} value={item}>{item > 5 ? '> 5' : item}</option>
                        ))}
                    </Select>
                </Box>

                <Box width={['100%', '100%', '13%']}>
                    <Text fontFamily='nunito' fontSize='12px' fontWeight='lighter'>Kamar Mandi</Text>
                    <Select value={kmDipilih} onChange={e => kmDipilihSet(e.target.value || 'semua')} fontFamily='nunito' marginBottom={['20px', '20px', '0px']} placeholder="Semua" >
                        {km.map(item => (
                            <option key={item} value={item}>{item > 5 ? '> 5' : item}</option>
                        ))}
                    </Select>
                </Box>

                <Flex fontFamily='nunito' marginBottom={['20px', '20px', '0px']} alignItems='center' width={['100%', '100%', '25%']} justifyContent='space-between'>
                    <Box width={['100%', '100%', '100%']}>
                        <Text fontFamily='nunito' fontSize='12px' fontWeight='lighter'>Dari Harga</Text>
                        <Select value={dariHargaDipilih}
                            onChange={e => {
                                dariHargaDipilihSet(e.target.value || 'semua');
                                if (e.target.value === 'lebih' || e.target.value === '') keHargaDipilihSet('');
                            }} fontFamily='nunito' marginBottom={['20px', '20px', '0px']} placeholder="Semua Harga">
                            <option value='kurang'>{'< Rp 1.000.000'}</option>
                            {dariHarga.map(item => (
                                <option key={item} value={item}>Rp {item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</option>
                            ))}
                            <option value='lebih'>{'> Rp 50.000.000'}</option>
                        </Select>
                    </Box>
                    {/* <Text mt='2'>-</Text> */}
                    {/* <Box width={['100%', '100%', '48%']}>
                        <Text fontFamily='nunito' fontSize='12px' fontWeight='lighter'>Ke Harga</Text>
                        <Select isDisabled={dariHargaDipilih === '' || dariHargaDipilih === 'lebih' || dariHargaDipilih === 'kurang'} value={keHargaDipilih}
                            onChange={e => keHargaDipilihSet(e.target.value || 'semua')} fontFamily='nunito' marginBottom={['20px', '20px', '0px']} placeholder="Semua Harga" >
                            {keHarga.map(item => (
                                <option key={item} value={item}>Rp {item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</option>
                            ))}
                            <option value='lebih'>{'> Rp 50.000.000'}</option>
                        </Select>
                    </Box> */}
                </Flex>
            </Flex>

            <MyButton isLoading={loadingBtn} width='150px' mt='4' onClick={CARI_KONTRAKAN}>CARI</MyButton>
        </Flex>
    );
}


export default SearchBar;