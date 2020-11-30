import React, { useEffect } from 'react';
import Greetins from './Greetings';
import { Box, } from '@chakra-ui/core';
import ShowUnit from './ShowUnit';
import CariBerdasarkanDaerah from './CariBerdasarkanDaerah';
import { connect } from 'react-redux';
import Axios from 'axios';
import { useState } from 'react';


const Home = ({ userLocationData, CheckForlocation, Alerting, restApi }) => {
    useEffect(() => {
        Axios.get(`${restApi}/kontrakan`)
            .then(res => {
                dataKontrakanLokasiSet(res.data);
            })
            .catch(err => {
                Alerting(err.message, 'error');
            })

        Axios.get(`${restApi}/kontrakan/filter/under20`)
            .then(res => {
                console.log(res.data.data)
                if (res.data.data.length === 0) return dataKontrakanMurahSet([])
                dataKontrakanMurahSet(res.data.data);
                // console.log(res.data.data)
            })
            .catch(err => {
                // Alerting(err.message, 'error');
            })
    }, [])

    const [dataKontrakanLokasi, dataKontrakanLokasiSet] = useState([]);
    const [dataKontrakanMurah, dataKontrakanMurahSet] = useState([]);
    return (
        <Box paddingX={['20px', '50px', '100px']}
            paddingTop='100px' >
            <Greetins />

            { /* kami pilihkan untuk anda */} <
                ShowUnit data={dataKontrakanLokasi}
                title={`Kontrakan di ${userLocationData.address.village !== '' ? userLocationData.address.village : 'Sekitar Anda'}`}
            />

            { /* Kontrakan murah bukan sembarang murah */} <
                ShowUnit data={dataKontrakanMurah}
                title='Kontrakan murah bukan sembarang murah' />

            { /* Cari berdasarkan daerah */} <
                CariBerdasarkanDaerah />
        </Box>
    );
}

const storeToProps = state => {
    return {
        userLocationData: state.userLocationData,
        restApi: state.restApi
    }
}

export default connect(storeToProps)(Home);