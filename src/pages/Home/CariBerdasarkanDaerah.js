import React from 'react';
import { Flex, Text, SimpleGrid } from '@chakra-ui/core';
import { NavLink } from 'react-router-dom';
import Jakarta from '../../assets/Jakarta.jpg';
import Denpasar from '../../assets/Denpasar.jpg';
import Yogyakarta from '../../assets/Yogyakarta.jpg';
import Medan from '../../assets/Medan.jpg';
import Pekanbaru from '../../assets/Pekanbaru.jpg';
import Makassar from '../../assets/Makassar.jpg';
import Fade from 'react-reveal/Fade';

const CariBerdasarkanDaerah = () => {
    const ListKota = [
        {
            idProvinsi: 31,
            provinsi: 'Dki Jakarta',
            kota: 'Jakarta',
            img: Jakarta
        },
        {
            idProvinsi: 51,
            provinsi: 'Bali',
            kota: 'Denpasar',
            img: Denpasar
        },
        {
            idProvinsi: 34,
            provinsi: 'Di Yogyakarta',
            kota: 'Yogyakarta',
            img: Yogyakarta
        },
        {
            idProvinsi: 12,
            provinsi: 'Sumatra Utara',
            kota: 'Medan',
            img: Medan
        },
        {
            idProvinsi: 14,
            provinsi: 'Riau',
            kota: 'Pekanbaru',
            img: Pekanbaru
        },
        {
            idProvinsi: 73,
            provinsi: 'Sulawesi Selatan',
            kota: 'Makassar',
            img: Makassar
        },
    ]
    return (
        <Fade>
            <Flex flexDir='column' marginY='100px'>
                <Text fontFamily='overlock'
                    mb='20px'
                    fontSize={['2xl', '2xl', '3xl']} fontWeight='900' textAlign={['center', 'left']}>
                    Cari berdasarkan daerah
            </Text>

                <SimpleGrid columns={[1, 3, 3,]} spacing={[3, 3, 7]}>
                    {ListKota.map(item => (
                        <NavLink key={item.kota} to={{
                            pathname: `/Cari-Kontrakan`,
                            lokasi: {
                                idProvinsi: item.idProvinsi,
                                provinsi: item.provinsi,
                                kota: `Kota ${item.kota}`
                            }
                        }}>
                            <Flex className='activeClickedKota'
                                borderWidth='1px' width={['100%']} height={['150px', '100px', '150px', '200px']} backgroundSize='cover' backgroundPosition='center'
                                borderRadius='10px' backgroundImage={`url(${item.img})`} alignItems='flex-end'
                                justifyContent='center' boxShadow='1px 1px 10px rgba(0,0,0,.1)'
                            >
                                <Text fontFamily='nunito' color='#fff' textShadow='1px 2px 3px rgba(0,0,0,.4)' padding='2px 5px'
                                    fontSize={['lg']} fontWeight='900' bg='rgba(0,0,0,.4)' mb='1' borderRadius='10px'>
                                    {item.kota}
                                </Text>
                            </Flex>
                        </NavLink>
                    ))}
                </SimpleGrid>
            </Flex>
        </Fade>
    );
}

export default CariBerdasarkanDaerah;