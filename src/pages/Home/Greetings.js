import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import MyButton from '../../components/MyComponents/MyButton';
import { NavLink } from 'react-router-dom';
import HeaderImage from '../../assets/headerImage.jpg';
import Fade from 'react-reveal/Fade';

const Greetins = () => {
    return (
        <Fade>
            <Flex flexDir={['column', 'row']} py='50px'>
                <Flex flexDir='column' alignItems={['center', 'flex-start']} width={['100%', '50%', '65%']} mb={['50px', '0px']} >
                    <Text fontFamily='overlock'
                        fontSize={['3xl', '2xl', '3xl']} fontWeight='900' textAlign={['center', 'left']}>
                        Butuh kontrakan untuk keluarga kamu?</Text>

                    <Box width={['100%', '200px', '320px']}>
                        <Text
                            fontFamily='nunito'
                            textAlign={['center', 'left']}
                        >
                            Kamu bisa dapatkan yang kamu mau disini!
                            <br />
                            Hunian baru dari yang untuk keluarga maupun tidak berkeluarga.
                        </Text>

                        <Text
                            fontFamily='nunito'
                            textAlign={['center', 'left']}
                        >

                        </Text>
                    </Box>

                    <NavLink to='/Cari-Kontrakan'>
                        <MyButton mt='20px' width={['100%', '130px']}>Cari Sekarang!</MyButton>
                    </NavLink>
                </Flex>

                <Flex width={['100%', '50%', '35%']} alignItems='center'>
                    <img style={{ width: '100%' }} src={HeaderImage} alt="" />
                </Flex>
            </Flex>
        </Fade>
    );
}

export default Greetins;