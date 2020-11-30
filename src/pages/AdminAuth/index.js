import { Box, FormControl, FormLabel, Input, Text, useDisclosure } from '@chakra-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import MyButton from '../../components/MyComponents/MyButton';
import firebase from 'firebase/app';
import 'firebase/auth';

const AdminAuth = ({ ShowAlertSet }) => {
    const { isOpen: btnLoading, onOpen: onLoading, onClose: onStopLoading } = useDisclosure();
    const [emailLogin, emailLoginSet] = useState('');
    const [passLogin, passLoginSet] = useState('');

    const Alerting = (msg, severity) => {
        ShowAlertSet(true, msg, severity);
        setTimeout(() => {
            ShowAlertSet(false, '', '')
        }, 2000);
    }

    const LOGIN = (e) => {
        e.preventDefault();
        onLoading();
        firebase.auth().signInWithEmailAndPassword(emailLogin, passLogin)
            .then((user) => {
                Alerting(`Hai ${user.user.displayName}`, 'success');
                onStopLoading();
            })
            .catch(err => {
                Alerting(err.message, 'error');
                onStopLoading();
            })
    }
    return (
        <Box paddingX={['20px', '50px', '100px']} paddingTop='100px' minH='100vh'>
            <Text fontSize='4xl' fontWeight='bold' textAlign='center' >Welcome Admin!</Text>
            <form onSubmit={LOGIN}>
                <FormControl my={5}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input type="email" id="email" value={emailLogin} onChange={e => emailLoginSet(e.target.value)} />
                </FormControl>
                <FormControl mb={5}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input type="password" id="password" value={passLogin} onChange={e => passLoginSet(e.target.value)} />
                </FormControl>

                <MyButton type='submit' isLoading={btnLoading}>Masuk</MyButton>
            </form>
        </Box>
    );
}

const dispatchToStore = dispatch => {
    return {
        ShowAlertSet: (show, msg, severity) => dispatch({ type: 'ShowAlertSet', show, msg, severity })
    }
}

export default connect(null, dispatchToStore)(AdminAuth);
