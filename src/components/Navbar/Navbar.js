import React, { useEffect, useState } from 'react';
import { FiMenu } from "react-icons/fi";
import Logo from '../../assets/logo-kontrakan.png';
import { Flex, Text, Box, Menu, MenuButton, MenuList, MenuGroup, MenuItem, Button, } from '@chakra-ui/core'
import { NavLink } from 'react-router-dom';
import MyButton from '../MyComponents/MyButton';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';

const Navbar = ({ onOpenDrawer, onCloseDrawer, onOpenLogin, isAuth, userData, kontakClickedSet }) => {
    useEffect(() => {
        isSmallSet(window.innerWidth >= 600 ? false : true);
        const checkSizeOfTheScreen = () => {
            if (window.innerWidth >= 600) {
                isSmallSet(false);
                onCloseDrawer();
            } else {
                isSmallSet(true);
            }
        }
        window.addEventListener('resize', checkSizeOfTheScreen)
        return () => window.removeEventListener("resize", checkSizeOfTheScreen);
    }, [])

    const [isSmall, isSmallSet] = useState(0);


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
        {
            label: 'Kontak',
            nav: '/Kontak'
        }
    ]

    const scrollToKontak = () => {
        window.scrollTo(0, document.body.scrollHeight);
        kontakClickedSet(true);
        setTimeout(() => kontakClickedSet(false), 1000);
    };

    const UserMenu = (
        <Menu closeOnBlur={true}>
            <MenuButton as={Button} bg='primary' variantColor="primary">
                {userData.displayName !== '' && userData.displayName !== null ? userData.displayName.slice(0, 16) : ' '} {userData.displayName.length > 15 ? '...' : ''}
            </MenuButton>
            <MenuList>
                <MenuGroup fontFamily='nunito' fontWeight='bold' title="Akun">
                    <NavLink activeStyle={{ color: '#02c1db' }} to='/Disimpan'><MenuItem fontFamily='nunito'>Disimpan</MenuItem></NavLink>
                    <NavLink activeStyle={{ color: '#02c1db' }} to='/Transaksi'> <MenuItem fontFamily='nunito'>Transaksi</MenuItem></NavLink>
                    <MenuItem fontFamily='nunito' onClick={() => firebase.auth().signOut()}>Keluar</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )

    return (
        <Box width='100%' bg='#fff' boxShadow='0 3px 10px rgba(0,0,0,.1)' position='fixed' zIndex='1000'>
            <Fade top>
                <Flex alignItems='center' justifyContent='space-between' padding='10px 20px'>
                    <img style={{ width: 100, cursor: 'pointer' }} src={Logo} alt="" />
                    {isSmall ? <FiMenu onClick={onOpenDrawer} color='#000' size={30} /> : null}

                    {isSmall ? null : <Flex minWidth='500px' justifyContent='space-around' alignItems='center'>
                        {NavItems.map(item => item.label !== 'Kontak' ? (
                            <NavLink exact activeClassName='navActive' to={item.nav} key={item.label}>
                                <Text fontFamily='overlock'>{item.label}</Text>
                            </NavLink>
                        ) : <Text key={item.label} cursor='pointer' onClick={scrollToKontak} fontFamily='overlock'>{item.label}</Text>)}
                        {!isAuth ? <MyButton onClick={onOpenLogin}>Masuk</MyButton> : UserMenu}
                    </Flex>}
                </Flex>
            </Fade>
        </Box>
    );
}


const storeToProps = state => {
    return {
        isAuth: state.isAuth,
        userData: state.userData
    }
}

const dispatchToStore = dispatch => {
    return {
        kontakClickedSet: (kontakVal) => dispatch({ type: 'kontakClickedSet', kontakVal })
    }
}

export default connect(storeToProps, dispatchToStore)(Navbar);