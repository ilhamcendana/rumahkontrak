import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/core';
import Fade from 'react-reveal/Fade'
import admin1 from '../../../assets/admin1.png';
import admin2 from '../../../assets/admin2.png';
import admin3 from '../../../assets/admin3.png';
import { useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { useState } from 'react';

const DashboardAdmin = ({ restApi }) => {
    useEffect(() => {
        getKontrakanData();
    }, [])

    const getKontrakanData = async () => {
        await Axios.get(`${restApi}/kontrakan`)
            .then(res => {
                const data = res.data;
                const tersedia = data.filter(item => item.status === "1");
                const disewa = data.filter(item => item.status === "0");

                dataKontrakanSet(prev => {
                    let sample = { ...prev };
                    sample.jumlahKontrakanTersedia = tersedia.length;
                    sample.jumlahKontrakanDisewa = disewa.length;
                    return sample;
                })
                getJumlahUsers();
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const getJumlahUsers = async () => {
        await Axios.get(`${restApi}/users`)
            .then(res => {
                const data = res.data;

                dataKontrakanSet(prev => {
                    let sample = { ...prev };
                    sample.jumlahPenggunaTerdaftar = data.length;
                    return sample;
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const [dataKontrakan, dataKontrakanSet] = useState({
        jumlahKontrakanTersedia: 0,
        jumlahKontrakanDisewa: 0,
        jumlahPenggunaTerdaftar: 0
    })
    return (
        <Flex justifyContent='space-between' flexWrap='wrap'>
            <Fade bottom>
                <Flex
                    color='#fff'
                    background='#72b9f3' borderRadius='20px' width='400px' height='250px' boxShadow='0px 0px 10px rgba(0,0,0,.3)' flexDir='column' padding='50px'>
                    <Text fontFamily='nunito' fontWeight='bold' fontSize='md' mb='2'>Jumlah Kontrakan Tersedia</Text>
                    <Text fontFamily='nunito' fontWeight='900' fontSize='3xl'>{dataKontrakan.jumlahKontrakanTersedia} Kontrakan</Text>
                    <Image width='30%' alignSelf='flex-end' src={admin1} alt="" />
                </Flex>

                <Flex
                    color='#fff' background='#ff9473'
                    borderRadius='20px' width='400px' height='250px' boxShadow='0px 0px 10px rgba(0,0,0,.3)' flexDir='column' padding='50px'>
                    <Text fontFamily='nunito' fontWeight='bold' fontSize='md' mb='2'>Jumlah Kontrakan Disewa</Text>
                    <Text fontFamily='nunito' fontWeight='900' fontSize='3xl'>{dataKontrakan.jumlahKontrakanDisewa} Kontrakan</Text>
                    <Image width='30%' alignSelf='flex-end' src={admin2} alt="" />
                </Flex>

                <Flex
                    color='#fff' background='#9684fb'
                    borderRadius='20px' width='400px' height='250px' boxShadow='0px 0px 10px rgba(0,0,0,.3)' flexDir='column' padding='50px'>
                    <Text fontFamily='nunito' fontWeight='bold' fontSize='md' mb='2'>Jumlah Pengguna Terdaftar</Text>
                    <Text fontFamily='nunito' fontWeight='900' fontSize='3xl'>{dataKontrakan.jumlahPenggunaTerdaftar} Pengguna</Text>
                    <Image width='30%' alignSelf='flex-end' src={admin3} alt="" />
                </Flex>
            </Fade>
        </Flex>
    );
}

const storeToProps = state => {
    return {
        restApi: state.restApi
    }
}

export default connect(storeToProps)(DashboardAdmin);