import React, { useState } from 'react';
import MyModal from '../MyComponents/MyModal';
import { Text, Stack, InputGroup, InputLeftElement, Icon, Input } from '@chakra-ui/core'
import MyButton from '../MyComponents/MyButton';
import { BsPeopleCircle } from 'react-icons/bs';
import firebase from 'firebase/app';
import 'firebase/auth';
import { connect } from 'react-redux';
import Axios from 'axios';
import qs from 'qs'


const storeToProps = state => {
    return {
        restApi: state.restApi
    }
}

const dispatchToStore = dispatch => {
    return {
        ShowAlertSet: (show, msg, severity) => dispatch({ type: 'ShowAlertSet', show, msg, severity })
    }
}


export const LoginModal = connect(null, dispatchToStore)(({ isOpenLogin, onCloseLogin, onOpenSignUp, ShowAlertSet }) => {
    const [emailLogin, emailLoginSet] = useState('');
    const [passLogin, passLoginSet] = useState('');
    const [btnLoading, btnLoadingSet] = useState(false);

    const Alerting = (msg, severity) => {
        ShowAlertSet(true, msg, severity);
        setTimeout(() => {
            ShowAlertSet(false, '', '')
        }, 2000);
    }

    const LOGIN = (e) => {
        e.preventDefault();
        btnLoadingSet(true);
        firebase.auth().signInWithEmailAndPassword(emailLogin, passLogin)
            .then((user) => {
                Alerting(`Hai ${user.user.displayName}`, 'success');
                onCloseLogin();
                btnLoadingSet(false);
            })
            .catch(err => {
                Alerting(err.message, 'error');
                btnLoadingSet(false);
            })
    }

    return (
        <MyModal flexDirection='column' title='Masuk Rumah Kontrak' isOpen={isOpenLogin} onClose={onCloseLogin}>
            <form onSubmit={LOGIN}>
                <Stack spacing={4}>
                    <InputGroup>
                        <InputLeftElement children={<Icon name="email" color="gray.300" />} />
                        <Input value={emailLogin} isRequired onChange={e => emailLoginSet(e.target.value)} type="email" placeholder="Email" />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement children={<Icon name="lock" color="gray.300" />} />
                        <Input value={passLogin} isRequired onChange={e => passLoginSet(e.target.value)} type="password" placeholder="Password" />
                    </InputGroup>

                    <MyButton type='submit' isLoading={btnLoading}>Masuk</MyButton>
                </Stack>
            </form>

            <Text mt='1' fontSize='sm' fontFamily='nunito'>Belum punya akun?<MyButton
                onClick={() => {
                    onCloseLogin();
                    onOpenSignUp();
                }} variant='link' bg='transparent' fontWeight='bold' color='primary'>Buat Akun</MyButton></Text>
        </MyModal>
    )
})

export const SignUpModal = connect(storeToProps, dispatchToStore)(({ isOpenSignUp, onCloseSignUp, onOpenLogin, ShowAlertSet, restApi }) => {

    const [emailSignUp, emailSignUpSet] = useState('');
    const [passwordSignUp, passwordSignUpSet] = useState('');
    const [namaLengkapSignUp, namaLengkapSignUpSet] = useState('');
    const [btnLoading, btnLoadingSet] = useState(false);

    const Alerting = (msg, severity) => {
        ShowAlertSet(true, msg, severity);
        setTimeout(() => {
            ShowAlertSet(false, '', '')
        }, 2000);
    }

    const SIGN_UP = (e) => {
        e.preventDefault();
        // Alerting('Fitur ini belum bisa', 'warning')
        btnLoadingSet(true);
        firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp)
            .then(async (user) => {
                await Axios({
                    method: 'post',
                    url: `${restApi}/users/create`,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: qs.stringify({ uid: user.user.uid, displayName: namaLengkapSignUp, emailUser: emailSignUp })
                })
                btnLoadingSet(false);
                onCloseSignUp();
                emailSignUpSet('');
                passwordSignUpSet('');
                namaLengkapSignUpSet('');
                return user.user.updateProfile({ displayName: namaLengkapSignUp })
            })
            .catch(err => {
                Alerting(err.message, 'error');
                btnLoadingSet(false);
            })
    }
    return (
        <MyModal size='xl' flexDirection='column' title='Buat Akun Rumah Kontrak' isOpen={isOpenSignUp} onClose={onCloseSignUp}>
            <form onSubmit={SIGN_UP}>
                <Stack spacing={4}>
                    <InputGroup>
                        <InputLeftElement children={<BsPeopleCircle color="#cbd6e0" />} />
                        <Input isRequired mr='1' value={namaLengkapSignUp} onChange={e => namaLengkapSignUpSet(e.target.value)} type="text" placeholder="Nama Lengkap" />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement children={<Icon name="email" color="gray.300" />} />
                        <Input isRequired value={emailSignUp} onChange={e => emailSignUpSet(e.target.value)} type="email" placeholder="Email" />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement children={<Icon name="lock" color="gray.300" />} />
                        <Input isRequired value={passwordSignUp} onChange={e => passwordSignUpSet(e.target.value)} type="password" placeholder="Password" />
                    </InputGroup>

                    <MyButton type='submit' isLoading={btnLoading}>Buat Akun</MyButton>
                </Stack>
            </form>

            <Text mt='1' fontSize='sm' fontFamily='nunito'>Sudah punya akun?<MyButton
                onClick={() => {
                    onCloseSignUp();
                    onOpenLogin();
                }} variant='link' bg='transparent' fontWeight='bold' color='primary'>Masuk</MyButton></Text>
        </MyModal>
    )
})