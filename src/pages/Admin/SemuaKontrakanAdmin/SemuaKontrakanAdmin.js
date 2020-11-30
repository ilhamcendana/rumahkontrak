import React, { useState } from 'react';
import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure, Flex, Input, Text, } from '@chakra-ui/core';
import ShowUnitAdmin from '../ShowUnitAdmin';
import { Redirect } from 'react-router-dom';
import MyButton from '../../../components/MyComponents/MyButton';
import { connect } from 'react-redux';
import Axios from 'axios';
import qs from 'qs'


const SemuaKontrakanAdmin = ({ data, dataDraft, ShowAlertSet, restApi, dataDummy, kontrakanLoading, cbFetch }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const Alerting = (msg, severity) => {
        ShowAlertSet(true, msg, severity);
        setTimeout(() => {
            ShowAlertSet(false, '', '')
        }, 2000);
    }

    const [NamaKontrakan, NamaKontrakanSet] = useState('');
    const [redirect, redirectSet] = useState({ red: false, id: '' });
    const [loadingBtn, loadingBtnSet] = useState(false);

    const BUAT_KONTRAKAN = () => {
        if (NamaKontrakan === '') return Alerting('Masukkan Nama Kontrakan', 'warning');
        loadingBtnSet(true);

        let dataDummyCustom = { ...dataDummy };
        dataDummyCustom.namaKontrakan = NamaKontrakan;

        Axios({
            method: 'post',
            url: `${restApi}/kontrakan/new`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify({
                namaKontrakan: NamaKontrakan
            }),
        })
            .then(res => {
                console.log(res.data);
                loadingBtnSet(false);
                cbFetch();
                return redirectSet({ red: true, id: res.data.id });
            })
            .catch(err => {
                console.log(err);
                loadingBtnSet(false);
            })
    }

    const drawerLeft = () => {
        return (
            <Drawer onClose={onClose} isOpen={isOpen} size='xl' placement='left'  >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader></DrawerHeader>
                    <DrawerBody overflow='scroll'>
                        <Text fontFamily='overlock'
                            mb='20px'
                            fontSize={['2xl', '2xl', '3xl']} fontWeight='900' textAlign={['center', 'left']}>
                            Buat kontrakan</Text>

                        <Flex width='300px'>
                            <Input value={NamaKontrakan} onChange={e => NamaKontrakanSet(e.target.value)} placeholder='Nama Kontrakan' mr='2' />
                            <MyButton isLoading={loadingBtn} onClick={BUAT_KONTRAKAN} px='30px'>Buat</MyButton>
                        </Flex>

                        <ShowUnitAdmin noDel cbFetch={cbFetch} noqr title='Draft' data={dataDraft} restApi={restApi} Alerting={Alerting} isLoading={kontrakanLoading} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        redirect.red ? <Redirect to={`/buat-kontrakan/${redirect.id}`} /> :
            <>
                <Box>
                    <ShowUnitAdmin cbFetch={cbFetch} Alerting={Alerting} add noqr title='Semua Kontrakan Tersedia' data={data} addClicked={onOpen} isLoading={kontrakanLoading} restApi={restApi} />
                </Box>

                {drawerLeft()}
            </>

    );
}

const storeToProps = state => {
    return {
        restApi: state.restApi
    }
}

const dispathToStore = dispatch => {
    return {
        ShowAlertSet: (show, msg, severity) => dispatch({ type: 'ShowAlertSet', show, msg, severity }),
    }
}

export default connect(storeToProps, dispathToStore)(SemuaKontrakanAdmin);