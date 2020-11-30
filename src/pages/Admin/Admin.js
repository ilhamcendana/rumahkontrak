import React from 'react';
import Topbar from './Topbar';
import { Box } from '@chakra-ui/core';
import { Route } from 'react-router-dom';
import DashboardAdmin from './DashboardAdmin/DashboardAdmin';
import SemuaKontrakanAdmin from './SemuaKontrakanAdmin/SemuaKontrakanAdmin';
import KontrakanForm from './SemuaKontrakanAdmin/Kontrakan/KontrakanForm';
import KontrakanDisewa from './SemuaKontrakanAdmin/KontrakanDisewa';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Transaksi from './Transaksi/Transaksi';


const dataDummy = {
    idKontrakan: '',
    namaKontrakan: '',
    urlGambarKontrakan: [],
    deskripsiKontrakan: '',
    hargaKontrakan: 0,
    provinsi: '',
    kotaKabupaten: '',
    kelurahan: '',
    kecamatan: '',
    alamat: '',
    publishDate: new Date(),
    KT: 0,
    KM: 0,
    luasBangunan: 0,
    luasTanah: 0,
    namaPemilikKontrakan: '',
    nomorPemilikKontrakan: null,
    disimpanUser: [],
    status: '1',
    publish: '0'
}





const Admin = ({ restApi }) => {
    useEffect(() => {
        fetchAwal();
    }, [])

    const fetchAwal = () => {
        Axios.get(`${restApi}/kontrakan`)
            .then(res => {
                const theData = res.data;

                //get tersedia
                const dataKontrakanTersediaSample = theData.filter(item => item.status === '1' && item.publish === '1');
                dataKontrakanTersediaSet(dataKontrakanTersediaSample);

                //get disewa
                const dataKontrakanDisewaSample = theData.filter(item => item.status === '0' && item.publish === '1');
                dataKontrakanDisewaSet(dataKontrakanDisewaSample);
                //getdraft
                const DraftKontrakanSample = theData.filter(item => item.publish === '0' && item.status === '0');
                DraftKontrakanSet(DraftKontrakanSample);
                console.log(res.data)
                kontrakanLoadingSet(false);
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const [dataKontrakanTersedia, dataKontrakanTersediaSet] = useState([]);
    const [dataKontrakanDisewa, dataKontrakanDisewaSet] = useState([]);
    const [DraftKontrakan, DraftKontrakanSet] = useState([]);
    const [kontrakanLoading, kontrakanLoadingSet] = useState(true);

    return (
        <>
            <Topbar />
            <Box width='100%' minHeight='100vh' padding='50px'>
                <Route exact path='/' component={DashboardAdmin} />
                <Route exact path='/kontrakan-tersedia' render={() => <SemuaKontrakanAdmin cbFetch={fetchAwal} kontrakanLoading={kontrakanLoading} data={dataKontrakanTersedia} dataDraft={DraftKontrakan} dataDummy={dataDummy} />} />
                <Route exact path='/kontrakan-disewa' render={() => <KontrakanDisewa data={dataKontrakanDisewa} kontrakanLoading={kontrakanLoading} />} />
                <Route exact path='/transaksi-admin' render={() => <Transaksi />} />
                <Route path='/buat-kontrakan/:id' render={() => <KontrakanForm cbFetch={fetchAwal} />} />
            </Box>
        </>
    );
}

const storeToProps = state => {
    return {
        restApi: state.restApi,
    }
}

export default connect(storeToProps)(Admin);