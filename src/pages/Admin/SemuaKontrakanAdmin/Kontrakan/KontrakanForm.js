import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Box, Flex, Button, Icon, Tooltip, Popover, PopoverTrigger, PopoverContent, PopoverCloseButton, PopoverBody, PopoverArrow, Text, } from '@chakra-ui/core';
import GambarKontrakan from './GambarKontrakanForm';
import DashboardKontrakan from './DashboardKontrakanForm';
import { connect } from 'react-redux';
import InstrumentKontrakan from './InstrumentKontrakanForm';
import { AiOutlineSave, AiOutlineSend } from 'react-icons/ai';
import firebase from 'firebase/app';
import 'firebase/storage';
import Axios from 'axios';
import qs from 'qs'


const Kontrakan = (props) => {
    const { ShowAlertSet, restApi, cbFetch } = props;
    const { id } = useParams();

    const Alerting = (msg, severity) => {
        ShowAlertSet(true, msg, severity);
        setTimeout(() => {
            ShowAlertSet(false, '', '')
        }, 2000);
    }

    useEffect(() => {
        fetchKontrak();
    }, [])

    const [btnLoading, btnLoadingSet] = useState(false);

    const [data, dataSet] = useState({
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
        gmaps: '',
        ulasan: []
    })

    const fetchKontrak = () => {
        Axios.get(`${restApi}/kontrakan/${id}`)
            .then(res => {
                let samplenya = { ...res.data.data };
                samplenya.luasBangunan = parseInt(samplenya.luasBangunan)
                samplenya.luasTanah = parseInt(samplenya.luasTanah)
                dataSet(samplenya)
            })
            .catch(err => {
                Alerting(err.message, 'error');
                btnLoadingSet(false);
            })
    }

    const fetchKontrakGambar = () => {
        Axios.get(`${restApi}/kontrakan/${id}`)
            .then(res => {
                dataSet(prev => {
                    let sample = { ...prev };
                    sample.urlGambarKontrakan = res.data.data.urlGambarKontrakan;
                    return sample
                })
            })
            .catch(err => {
                Alerting(err.message, 'error');
                btnLoadingSet(false);
            })
    }



    const [imageFile, imageFileSet] = useState([]);

    const UploadImage = async (e) => {
        btnLoadingSet(true);
        await firebase.storage().ref(`Kontrakan/${data.idKontrakan}/${e.name}`).put(e)
            .then(async ref => await ref.ref.getDownloadURL()
                .then(async url => {
                    let urlAfter = [...data.urlGambarKontrakan];
                    urlAfter.push(url);
                    await Axios({
                        method: 'post',
                        url: `${restApi}/kontrakan/${id}/save`,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: qs.stringify({
                            urlGambarKontrakan: urlAfter
                        })
                    })
                        .then(() => {
                            fetchKontrakGambar()
                            btnLoadingSet(false);
                        })
                        .catch(err => {
                            Alerting(err.message, 'error');
                            btnLoadingSet(false);
                        })
                })
                .catch(err => {
                    Alerting(err.message, 'error');
                    btnLoadingSet(false);
                })
            )
            .catch(err => {
                Alerting(err.message, 'error');
                btnLoadingSet(false);
            })
    }

    const SAVE_KONTRAKAN = async () => {
        btnLoadingSet(true);
        await Axios({
            method: 'post',
            url: `${restApi}/kontrakan/${id}/save`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify({
                namaKontrakan: data.namaKontrakan,
                deskripsiKontrakan: data.deskripsiKontrakan,
                hargaKontrakan: data.hargaKontrakan,
                provinsi: data.provinsi,
                kotaKabupaten: data.kotaKabupaten,
                kelurahan: data.kelurahan,
                kecamatan: data.kecamatan,
                alamat: data.alamat,
                KT: data.KT,
                KM: data.KM,
                luasBangunan: data.luasBangunan,
                luasTanah: data.luasTanah,
                namaPemilikKontrakan: data.namaPemilikKontrakan,
                nomorPemilikKontrakan: data.nomorPemilikKontrakan,
                gmaps: data.gmaps,
                urlGambarKontrakan: data.urlGambarKontrakan
            })
        })
            .then(() => {
                Alerting('Disimpan', 'success')
                imageFileSet([]);
                btnLoadingSet(false);
                cbFetch();
            })
            .catch(err => {
                Alerting(err.message, 'error');
                btnLoadingSet(false);
            })

    }

    const hapusKontrakan = () => {
        btnLoadingSet(true);
        Axios.post(`${restApi}/kontrakan/${id}/hapus`)
            .then(res => {
                Alerting('Kontrakan dihapus', 'success')
                btnLoadingSet(false);
                redirectSet(true);
                cbFetch()
            })
            .catch(err => {
                Alerting(err.message, 'error')
                btnLoadingSet(false);
            })
    }


    const checkDulu = () => {
        const { namaKontrakan, urlGambarKontrakan, deskripsiKontrakan, hargaKontrakan, provinsi, kotaKabupaten, kelurahan, kecamatan, alamat, KT, KM, luasBangunan, luasTanah, namaPemilikKontrakan, nomorPemilikKontrakan, gmaps } = data;
        if (namaKontrakan === '') return Alerting('Nama kontrakan tidak boleh kosong!', 'warning');
        if (urlGambarKontrakan.length === 0) return Alerting('Minimal memiliki 1 foto!', 'warning');
        if (deskripsiKontrakan === '') return Alerting('Deskripsi kontrakan tidak boleh kosong!', 'warning');
        if (hargaKontrakan === 0 || hargaKontrakan === '' || hargaKontrakan === null) return Alerting('Harga kontrakan tidak boleh kosong!', 'warning');
        if (provinsi === '' || kotaKabupaten === '' || kecamatan === '' || kelurahan === '' || alamat === '') return Alerting('Semua kolom lokasi dan alamat kontrakan tidak ada yang boleh kosong!', 'warning');
        if (KT === 0 || KM === 0 || luasBangunan === 0 || luasTanah === 0) return Alerting('Semua kolom detail kontrakan tidak ada yang boleh kosong!', 'warning');
        if (namaPemilikKontrakan === '' || nomorPemilikKontrakan === '') return Alerting('Nama pemilik dan Nomor pemilik tidak boleh kosong!', 'warning');
        if (gmaps === '') return Alerting('alamat embed google maps tidak boleh kosong', 'warning');
        return 'aman'
    }

    const [redirect, redirectSet] = useState(false);
    const publish = () => {
        if (checkDulu() === 'aman') {
            SAVE_KONTRAKAN()
            btnLoadingSet(true);
            Axios.post(`${restApi}/kontrakan/${id}/publish`)
                .then(() => {
                    Alerting('Berhasil publish kontrakan', 'success');
                    btnLoadingSet(false);
                    redirectSet(true);
                    cbFetch()
                })
                .catch(err => {
                    Alerting(err.message, 'error');
                    btnLoadingSet(false);
                })
        }
    }



    return (
        redirect ? <Redirect to='/kontrakan-tersedia' /> :
            <>
                <Box paddingX={['20px', '50px', '100px']} paddingTop='20px' minHeight='100vh' marginBottom='100px'>
                    <Flex mb='50px'>
                        <Tooltip hasArrow label="Simpan" placement="top">
                            <Button isLoading={btnLoading} onClick={SAVE_KONTRAKAN} bg='primary' color='#fff'>
                                <AiOutlineSave />
                            </Button>
                        </Tooltip>

                        <Popover usePortal>
                            <PopoverTrigger>
                                <Button isLoading={btnLoading} mx='4' bg='danger' color='#fff'>
                                    <Icon name='delete' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent zIndex={4}>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <Text width='85%' fontFamily='nunito'>Anda yakin ingin menghapus kontrakan ini ?</Text>
                                    <Button onClick={hapusKontrakan} bg='danger' color='#fff' >Hapus</Button>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>


                        <Popover usePortal>
                            <PopoverTrigger>
                                <Button isLoading={btnLoading} bg='primary' color='#fff'>
                                    Publish
                                <AiOutlineSend style={{ marginLeft: 5 }} />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent zIndex={4}>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <Text width='85%' fontFamily='nunito'>Anda yakin ingin mempublish kontrakan ini ?</Text>
                                    <Button bg='primary' color='#fff' onClick={publish}>Publish</Button>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>

                    </Flex>

                    <GambarKontrakan urlGambarKontrakan={data.urlGambarKontrakan} dataSet={dataSet} imageFileSet={imageFileSet} btnLoading={btnLoading} onChangeImage={e => UploadImage(e)} />
                    <Flex flexDirection={['column', 'column', 'row']} justifyContent='space-between' width='100%'>
                        <DashboardKontrakan data={data} userData={props.userData} onOpenLogin={props.onOpenLogin} isAuth={props.isAuth} dataSet={dataSet} />
                        <InstrumentKontrakan data={data} dataSet={dataSet} />
                    </Flex>
                </Box>
            </>
    );
}

const storeToProps = state => {
    return {
        userData: state.userData,
        isAuth: state.isAuth,
        restApi: state.restApi
    }
}

const dispathToStore = dispatch => {
    return {
        ShowAlertSet: (show, msg, severity) => dispatch({ type: 'ShowAlertSet', show, msg, severity }),
    }
}

export default connect(storeToProps, dispathToStore)(Kontrakan);