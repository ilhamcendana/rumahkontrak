import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/core';


const MyAlert = ({ show }) => {
    return (
        <Alert
            zIndex='9999'
            transition='.3s'
            position='fixed'
            bottom={show.show ? '0px' : '-80px'}
            width='100%'
            justifyContent='center'
            fontFamily='nunito' status={show.severity}>
            <AlertIcon />
            {show.msg}
        </Alert>
    );
}

export default MyAlert;