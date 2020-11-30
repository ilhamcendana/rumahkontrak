import React from 'react';
import { Flex, Image, Box, Text } from '@chakra-ui/core';
import gambarTentang from '../../assets/gambarTentang.jpg';

const Tentang = () => {
    return (
        <Flex paddingX={['20px', '50px', '100px']} paddingTop='100px' minHeight='100vh' mb={['100px', '100px', '0px']} flexDirection={['column-reverse', 'column-reverse', 'row']} justifyContent='space-between'>
            <Flex flexDirection='column' width={['100%', '100%', '35%']}>
                <Box mb='100px'>
                    <Text fontFamily='overlock' fontSize='2xl' fontWeight='bold' textAlign={['center', 'left']}>Apa itu Rumah Kontrak?</Text>
                    <Text fontFamily='nunito' fontSize='sm' textAlign={['center', 'left']}>Rumah kontrak merupakan aplikasi pencari kontrakan secara online yang memberikan kemudahan, kecepatan dalam mencari rumah kontrakan</Text>
                </Box>

                <Box>
                    <Text fontFamily='overlock' fontSize='2xl' fontWeight='bold' textAlign={['center', 'left']}>Mengapa Rumah Kontrak?</Text>
                    <Text fontFamily='nunito' fontSize='sm' textAlign={['center', 'left']}>Dengan rumah kontrak, anda bisa memilih rumah kontrakan terbaik. Mencari rumah kontrakan dapat dilakukan dengan mudah dan cepat menggunakan fitur dari aplikasi rumah kontrak.</Text>
                </Box>
            </Flex>


            <Flex width={['100%', '100%', '50%']} alignItems='center' flexDirection='column'>
                <Text fontFamily='overlock' fontSize='3xl' fontWeight='900' textAlign='center' >Kebutuhan Properti Kamu Ada Disini!</Text>
                <Text fontFamily='nunito' fontSize='xs' width='80%' textAlign='center'>Semakin meningkatnya harga penjualan rumah membuat sebagian orang memilih untuk menyewa rumah.</Text>

                <Box width='100%'>
                    <Image src={gambarTentang} borderBottomLeftRadius='100px' borderBottomRightRadius='100px' />
                </Box>
            </Flex>
        </Flex>
    );
}

export default Tentang;