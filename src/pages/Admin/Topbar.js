import React from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
    const navItems = [
        {
            label: 'Dashboard',
            nav: '/'
        },
        {
            label: 'Kontrakan Tersedia',
            nav: '/kontrakan-tersedia'
        },
        {
            label: 'Kontrakan Disewa',
            nav: '/kontrakan-disewa'
        },
        {
            label: 'Transaksi',
            nav: '/transaksi-admin'
        }
    ]
    return (
        <Flex width='100%' background='#fff' px='50px' position='relative' py='20px' justifyContent='space-between' alignItems='center'>
            <Box >
                <Text fontFamily='overlock' textAlign='center' fontWeight='900' color='primary'>Rumah Kontrak Admin</Text>
            </Box>

            <Flex width='500px' justifyContent='space-around' alignItems='center'>
                {navItems.map(item => (
                    <NavLink key={item.label} exact to={item.nav}
                        style={{ borderBottomWidth: '3px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0)', transition: '.3s', color: '#999' }}
                        activeStyle={{ color: '#02c1db', fontWeight: 'bold', borderBottomColor: '#02c1db', }}>
                        <Text variant='ghost' width='100%' mb='2' fontFamily='nunito'>{item.label}</Text>
                    </NavLink>
                ))}
            </Flex>

            <Button variantColor='red' onClick={() => firebase.auth().signOut().then(() => window.location.pathname = '/')} >KELUAR</Button>
        </Flex>
    );
}

export default Sidebar;