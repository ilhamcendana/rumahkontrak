import React, { useState } from 'react';
import { Box, Text, Button, useDisclosure, Flex, Editable, EditablePreview, EditableInput, Textarea, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Input } from '@chakra-ui/core';
import QRCode from 'qrcode.react';
import { AiOutlineNumber } from 'react-icons/ai';
import { FaRegBuilding } from 'react-icons/fa';
import { FaBed, FaBath } from 'react-icons/fa'
import MyModal from '../../../../components/MyComponents/MyModal';
import { useEffect } from 'react';
import Axios from 'axios';

const DashboardKontrakan = ({ data, userData, isAuth, onOpenLogin, dataSet }) => {
        const [qrcodePathname] = useState('');
        const { isOpen, onClose, } = useDisclosure();

        useEffect(() => {
            Axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
                .then(res => {
                    ProvinsiSet(res.data);

                    if (data.provinsi !== '') {
                        const filterIdProv = res.data.provinsi.filter(item => item.nama === data.provinsi);
                        Axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${filterIdProv[0].id}`)
                            .then(resProv => {
                                KotaKabupatenSet(resProv.data)

                                if (data.kotaKabupaten !== '') {
                                    const filterIdKota = resProv.data.kota_kabupaten.filter(item => item.nama === data.kotaKabupaten);

                                    Axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${filterIdKota[0].id}`)
                                        .then(resKota => {
                                            KecamatanSet(resKota.data)

                                            if (data.kecamatan !== '') {
                                                const filterIdKecamatan = resKota.data.kecamatan.filter(item => item.nama === data.kecamatan);

                                                Axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${filterIdKecamatan[0].id}`)
                                                    .then(resKecamatan => {
                                                        KelurahanSet(resKecamatan.data)
                                                    })
                                                    .catch(err => {
                                                        alert(err.message);
                                                    })
                                            }
                                        })
                                        .catch(err => {
                                            alert(err.message);
                                        })
                                }
                            })
                            .catch(err => {
                                alert(err.message);
                            })
                    }
                })
                .catch(err => {
                    alert(err.message);
                })
        }, [])

        const changeData = (e, type) => {
            dataSet(prev => {
                return {
                    ...prev,
                    [type]: e
                }
            })
        }

        const provinsiChange = e => {
            changeData(e.target.value, 'provinsi');
            if (e.target.value === '') return null;
            const filterIdProv = Provinsi.provinsi.filter(item => item.nama === e.target.value);

            Axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${filterIdProv[0].id}`)
                .then(res => {
                    KotaKabupatenSet(res.data)
                })
                .catch(err => {
                    alert(err.message);
                })
        }

        const kotaChange = e => {
            changeData(e.target.value, 'kotaKabupaten');
            if (e.target.value === '') return null;
            const filterIdKota = KotaKabupaten.kota_kabupaten.filter(item => item.nama === e.target.value);

            Axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${filterIdKota[0].id}`)
                .then(res => {
                    KecamatanSet(res.data)
                })
                .catch(err => {
                    alert(err.message);
                })
        }

        const kecamatanChange = e => {
            changeData(e.target.value, 'kecamatan');
            if (e.target.value === '') return null;
            const filterIdKecamatan = Kecamatan.kecamatan.filter(item => item.nama === e.target.value);

            Axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${filterIdKecamatan[0].id}`)
                .then(res => {
                    KelurahanSet(res.data)
                })
                .catch(err => {
                    alert(err.message);
                })
        }

        const [Provinsi, ProvinsiSet] = useState({ provinsi: [] });
        const [KotaKabupaten, KotaKabupatenSet] = useState({ kota_kabupaten: [] });
        const [Kecamatan, KecamatanSet] = useState({ kecamatan: [] });
        const [Kelurahan, KelurahanSet] = useState({ kelurahan: [] });

        return ( <
                >
                <
                Box width = {
                    ['100%', '100%', '65%']
                } >
                <
                Editable mt = '4'
                mb = '30px'
                fontSize = '2rem'
                fontWeight = 'bold'
                fontFamily = 'overlock'
                defaultValue = { data.namaKontrakan }
                value = { data.namaKontrakan }
                onChange = { e => changeData(e, 'namaKontrakan') } >
                <
                EditablePreview / >
                <
                EditableInput / >
                <
                /Editable>

                { /* {data.Alamat} {data.Kelurahan} {data.Kecamatan} */ }

                <
                Flex justifyContent = 'space-between'
                pr = '10px' >
                <
                Select value = { data.provinsi }
                onChange = { e => provinsiChange(e) }
                width = '130px'
                fontFamily = 'nunito'
                color = '#999999'
                placeholder = 'Provinsi' > {
                    Provinsi.provinsi.map((child, index) => < option key = { index }
                        value = { child.nama } > { child.nama } < /option>)} < /
                        Select >

                        <
                        Select defaultValue = { data.kotaKabupaten }
                        value = { data.kotaKabupaten }
                        onChange = { e => kotaChange(e) }
                        width = '130px'
                        fontFamily = 'nunito'
                        color = '#999999'
                        placeholder = 'Kota_Kabupaten' > {
                            KotaKabupaten.kota_kabupaten.map((child, index) => < option key = { index }
                                value = { child.nama } > { child.nama } < /option>)} < /
                                Select >

                                <
                                Select value = { data.kecamatan }
                                onChange = { e => kecamatanChange(e) }
                                width = '130px'
                                fontFamily = 'nunito'
                                color = '#999999'
                                placeholder = 'Kecamatan' > {
                                    Kecamatan.kecamatan.map((child, index) => < option key = { index }
                                        value = { child.nama } > { child.nama } < /option>)} < /
                                        Select >

                                        <
                                        Select value = { data.kelurahan }
                                        onChange = { e => changeData(e.target.value, 'kelurahan') }
                                        width = '130px'
                                        fontFamily = 'nunito'
                                        color = '#999999'
                                        placeholder = 'Kelurahan' > {
                                            Kelurahan.kelurahan.map((child, index) => < option key = { index }
                                                value = { child.nama } > { child.nama } < /option>)} < /
                                                Select > <
                                                /Flex>

                                                <
                                                Editable mt = '4'
                                                fontWeight = 'bold'
                                                fontFamily = 'nunito'
                                                defaultValue = { data.alamat }
                                                value = { data.alamat }
                                                onChange = { e => changeData(e, 'alamat') }
                                                placeholder = 'Alamat' >
                                                <
                                                EditablePreview / >
                                                <
                                                EditableInput / >
                                                <
                                                /Editable>

                                                <
                                                Box mt = '30px' >
                                                <
                                                Text fontFamily = 'nunito'
                                                color = '#999'
                                                fontWeight = 'bold' > Detail Kontrakan < /Text>

                                                <
                                                Flex width = '100%'
                                                color = "gray.500"
                                                fontWeight = "semibold"
                                                letterSpacing = "wide"
                                                fontSize = "12px"
                                                flexWrap = 'wrap'
                                                justifyContent = {
                                                    ['space-between', 'flex-start']
                                                }
                                                mt = '20px'
                                                flexDir = 'column' >
                                                <
                                                Flex >
                                                <
                                                Flex mr = '2'
                                                flexDir = 'column'
                                                alignItems = 'center' >
                                                <
                                                Flex alignItems = 'center' >
                                                <
                                                FaBed fill = '#999' / >
                                                <
                                                Text ml = '1'
                                                fontFamily = 'nunito' > { data.KT }
                                                Kamar Tidur < /Text> < /
                                                Flex >

                                                <
                                                Flex mt = '4' >
                                                <
                                                Button isDisabled = { data.KT === 0 }
                                                onClick = {
                                                    () => changeData(parseInt(data.KT) - 1, 'KT')
                                                }
                                                mr = '2'
                                                size = 'xs' > - < /Button> <
                                                Button onClick = {
                                                    () => changeData(parseInt(data.KT) + 1, 'KT')
                                                }
                                                ml = '2'
                                                size = 'xs' > + < /Button> < /
                                                Flex > <
                                                /Flex>

                                                <
                                                Flex ml = '2'
                                                mr = '2'
                                                flexDir = 'column'
                                                alignItems = 'center' >
                                                <
                                                Flex alignItems = 'center' >
                                                <
                                                FaBath fill = '#999' / >
                                                <
                                                Text ml = '1'
                                                fontFamily = 'nunito' > { data.KM }
                                                Kamar Mandi < /Text> < /
                                                Flex >

                                                <
                                                Flex mt = '4' >
                                                <
                                                Button isDisabled = { data.KM === 0 }
                                                onClick = {
                                                    () => changeData(parseInt(data.KM) - 1, 'KM')
                                                }
                                                mr = '2'
                                                size = 'xs' > - < /Button> <
                                                Button onClick = {
                                                    () => changeData(parseInt(data.KM) + 1, 'KM')
                                                }
                                                ml = '2'
                                                size = 'xs' > + < /Button> < /
                                                Flex > <
                                                /Flex> < /
                                                Flex >

                                                <
                                                Flex mr = '2'
                                                ml = {
                                                    ['0', '2']
                                                }
                                                flexDir = 'column'
                                                mt = '4' >
                                                <
                                                Flex alignItems = 'center' >
                                                <
                                                FaRegBuilding fill = '#999' / >
                                                <
                                                Text ml = '1'
                                                fontFamily = 'nunito' > Luas Bangunan { data.luasBangunan } & #13217;</Text>
                            </Flex>

                            <Slider defaultValue= { data.luasBangunan }
                                                max = { 5000 }
                                                min = { 10 }
                                                mt = '4'
                                                onChange = { e => changeData(e / 10, 'luasBangunan') } >
                                                <
                                                SliderTrack / >
                                                <
                                                SliderFilledTrack / >
                                                <
                                                SliderThumb / >
                                                <
                                                /Slider> < /
                                                Flex >

                                                <
                                                Flex ml = '2'
                                                mr = '2'
                                                width = {
                                                    ['50%', 'auto']
                                                }
                                                mt = '4'
                                                flexDir = 'column' >
                                                <
                                                Flex alignItems = 'center' >
                                                <
                                                AiOutlineNumber fill = '#999' / >
                                                <
                                                Text ml = '1'
                                                fontFamily = 'nunito' > Luas Tanah { data.luasTanah } & #13217;</Text>
                            </Flex>

                            <Slider defaultValue= { data.luasTanah }
                                                max = { 5000 }
                                                min = { 10 }
                                                mt = '4'
                                                onChange = { e => changeData(e / 10, 'luasTanah') } >
                                                <
                                                SliderTrack / >
                                                <
                                                SliderFilledTrack / >
                                                <
                                                SliderThumb / >
                                                <
                                                /Slider> < /
                                                Flex > <
                                                /Flex> < /
                                                Box >

                                                <
                                                Box mt = '50px'
                                                width = {
                                                    ['100%', '100%', '100%']
                                                }
                                                pr = '20px' >
                                                <
                                                Text fontFamily = 'nunito'
                                                color = '#999'
                                                fontWeight = 'bold' > Deskripsi Kontrakan < /Text> <
                                                Textarea mt = '4'
                                                color = '#999'
                                                fontFamily = 'nunito'
                                                defaultValue = { data.deskripsiKontrakan }
                                                value = { data.deskripsiKontrakan }
                                                onChange = { e => changeData(e.target.value, 'deskripsiKontrakan') }
                                                /> < /
                                                Box >

                                                <
                                                Box mt = '50px'
                                                width = {
                                                    ['100%', '100%', '100%']
                                                }
                                                pr = '20px' >
                                                <
                                                Text mb = '2'
                                                fontSize = 'sm'
                                                fontWeight = 'bolder'
                                                fontFamily = 'nunito' > < /Text> <
                                                Input placeholder = 'Lokasi Kontrakan'
                                                value = { data.gmaps }
                                                onChange = { e => changeData(e.target.value, 'gmaps') }
                                                /> < /
                                                Box > <
                                                /Box>

                                                <
                                                MyModal isOpen = { isOpen }
                                                onClose = { onClose }
                                                title = 'QR CODE' >
                                                <
                                                QRCode value = { `${window.location.host}/kontrakan/${qrcodePathname}` }
                                                /> < /
                                                MyModal > <
                                                />
                                            );
                                        }



                                        export default DashboardKontrakan;