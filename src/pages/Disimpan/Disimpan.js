import React from 'react';
import { Box } from '@chakra-ui/core';
import ShowUnit from '../Home/ShowUnit';
import { useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { useState } from 'react';


const Disimpan = ({ userData, restApi }) => {
    useEffect(() => {
        Axios.get(`${restApi}/users/${userData.uid}/favorite`)
            .then(res => {
                disimpanDataSet(res.data.data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    const [disimpanData, disimpanDataSet] = useState([]);
    return (
        <Box paddingX={['20px', '50px', '100px']} paddingTop='100px' minH='100vh'>
            <ShowUnit title='Kontrakan disimpan' data={disimpanData} />
        </Box>
    );
}

const storeToProps = state => {
    return {
        userData: state.userData,
        restApi: state.restApi
    }
}

export default connect(storeToProps)(Disimpan);