import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import Logo from '../../assets/logo-kontrakan.png'
import { NavLink } from 'react-router-dom';
import { AiOutlineWhatsApp, AiOutlineMail } from 'react-icons/ai'
import { connect } from 'react-redux';

const Footer = ({ kontakClicked }) => {
    const NavItems = [
        {
            label: 'Home',
            nav: '/'
        },
        {
            label: 'Cari Kontrakan',
            nav: '/Cari-Kontrakan'
        },
        {
            label: 'Tentang',
            nav: '/Tentang'
        },
    ]

    const HubungiItems = [
        {
            label: 'fajarfebriansyah.rian@gmail.com',
            nav: 'mailto:fajarfebriansyah.rian@gmail.com?subject=Selamat Datang',
            icon: <AiOutlineMail />
        },
        {
            label: '081297608982',
            nav: "https://api.whatsapp.com/send?phone=+6281297608982",
            icon: <AiOutlineWhatsApp />
        },
    ]
    return (
        <Flex flexDir='column' bg='#f5f5f5' py='20px' px={['20px', '50px', '100px']}>
            <Flex flexDir={['column', 'column', 'row']} width='100%' justifyContent='space-between'>
                <Flex width={['100%', '100%', '50%']} justifyContent='space-between'>
                    <Box width={['50%']}>
                        <img style={{ width: 150 }} src={Logo} alt="" />
                        <Text fontFamily='nunito' fontWeight='bold'>Kamu bisa dapatkan yang kamu mau disini!</Text>
                    </Box>

                    <Box>
                        <Text fontWeight='bold' fontFamily='nunito' fontSize={['sm', 'lg']}>Rumah Kontrak</Text>
                        <ul>
                            {NavItems.map(item => (
                                <li key={item.label} style={{ listStyle: 'none' }}>
                                    <NavLink to={item.nav}>
                                        <Text fontFamily='nunito' fontSize='sm'>{item.label}</Text>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </Box>
                </Flex>

                <Box mt={['25px', '25px', '0px']} >
                    <Text fontWeight='bold' fontFamily='nunito' fontSize='lg' color={kontakClicked ? 'primary' : '#000'} transition='.3s'>Hubungi Kami</Text>
                    <ul style={{ color: kontakClicked ? '#02c1db' : '#000', transition: '.3s' }}>
                        {HubungiItems.map(item => (
                            <li key={item.label} style={{ listStyle: 'none' }}>
                                <a target='_blank' style={{ display: 'flex', alignItems: 'center' }} rel="noopener noreferrer" href={item.nav}>
                                    {item.icon}
                                    <Text ml='1' fontFamily='nunito' fontSize='sm'>{item.label}</Text>
                                </a>
                            </li>
                        ))}
                    </ul>
                </Box>
            </Flex>


            <Text textAlign='center' fontFamily='nunito' mt='50px' fontSize='14px'>&copy; {new Date().getFullYear()} Rumah Kontrak | All rights reserved</Text>
        </Flex>
    );
}

const storeToProps = state => {
    return {
        kontakClicked: state.kontakClicked
    }
}
export default connect(storeToProps)(Footer);