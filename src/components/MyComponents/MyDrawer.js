import React from 'react';
import { Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerFooter, DrawerBody, Menu, MenuButton, Button, MenuList, MenuGroup, MenuItem, } from '@chakra-ui/core';
import MyButton from './MyButton';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { connect } from 'react-redux';

const MyDrawer = ({ isOpen, onClose, onOpenLogin, onCloseDrawer, isAuth, userData }) => {

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

    const UserMenu = (
        <Menu closeOnBlur={true}>
            <MenuButton as={Button} width='100%' bg='primary' variantColor="primary">
                {userData.displayName.slice(0, 16)}{userData.displayName.length > 15 ? '...' : ''}
            </MenuButton>
            <MenuList>
                <MenuGroup fontFamily='nunito' fontWeight='bold' title="Akun">
                    <NavLink activeStyle={{ color: '#02c1db' }} to='/Disimpan'>  <MenuItem fontFamily='nunito'>Disimpan</MenuItem></NavLink>
                    <NavLink activeStyle={{ color: '#02c1db' }} to='/Transaksi'>    <MenuItem fontFamily='nunito'>Transaksi</MenuItem></NavLink>
                    <MenuItem fontFamily='nunito' onClick={() => firebase.auth().signOut()}>Keluar</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader fontFamily='overlock' fontWeight='bold' paddingLeft='40px'>Menu</DrawerHeader>

                <DrawerBody>
                    {NavItems.map(item => (
                        <NavLink exact activeClassName='navActive' to={item.nav} key={item.label}>
                            <Text
                                className='activeClicked'
                                fontFamily='overlock'
                                justifyContent='flex-start'
                                padding='5px 16px'
                                bg='transparent'
                                width='100%'>{item.label}</Text>
                        </NavLink>
                    ))}
                </DrawerBody>

                <DrawerFooter>
                    {!isAuth ? <MyButton onClick={() => {
                        onOpenLogin()
                        onCloseDrawer();
                    }} width='100%'>Masuk</MyButton> : UserMenu}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

const storeToProps = state => {
    return {
        isAuth: state.isAuth,
        userData: state.userData
    }
}

export default connect(storeToProps)(MyDrawer);