import React from 'react';
import { Box, Text, Image, Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Flex } from '@chakra-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Pdf from "react-to-pdf";

const Transaksi = ({ restApi, ShowAlertSet }) => {
    useEffect(() => {
        Axios.get(`${restApi}/users`)
            .then(res => {
                let sample = [...res.data];
                let bucket = [];
                sample.forEach(item => bucket.push(item));
                getKontrakanData(bucket)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const ref = React.createRef();
    const Alerting = (msg, severity) => {
        ShowAlertSet(true, msg, severity);
        setTimeout(() => {
            ShowAlertSet(false, '', '')
        }, 2000);
    }

    const getKontrakanData = async (bucket) => {
        await bucket.forEach(async item => {
            await item.transaksi.forEach(async child => {
                await Axios.get(`${restApi}/kontrakan/${child.idKontrakan}`)
                    .then(res => {
                        dataSet(prev => {
                            let sample = [...prev];
                            sample.push({
                                namaPenyewa: item.displayName,
                                emailPenyewa: item.emailUser,
                                namaKontrakan: res.data.data.namaKontrakan,
                                hargaKontrakan: res.data.data.hargaKontrakan,
                                lamaSewa: '2',
                                totalHarga: res.data.data.hargaKontrakan * 2,
                                buktiPembayaran: child.buktiPembayaran,
                                idKontrakan: res.data.data.idKontrakan,
                                status: res.data.data.status
                            })
                            console.log(sample)
                            return sample;
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        })
    }

    const TH = [
        {
            label: 'No',
            record: 'no'
        },
        {
            label: 'Nama Penyewa',
            record: 'namaPenyewa'
        },
        {
            label: 'Email Penyewa',
            record: 'emailPenyewa'
        },
        {
            label: 'Unit Kontrakan',
            record: 'namaKontrakan'
        },
        {
            label: 'Harga Unit',
            record: 'hargaKontrakan'
        },
        {
            label: 'Lama Sewa',
            record: 'lamaSewa'
        },
        {
            label: 'Total Harga',
            record: 'totalHarga'
        },
        {
            label: 'Bukti Pembayaran',
            record: 'buktiPembayaran'
        },
        {
            label: 'Action',
            record: 'Action'
        },
        {
            label: 'Invoice',
            record: 'Invoice'
        }
    ]

    const [data, dataSet] = useState([])
    const [fullScreenShow, fullScreenShowSet] = useState(false);
    const [UrlGambarKontrakanOpen, UrlGambarKontrakanOpenSet] = useState('');
    const [btnLoading, btnLoadingSet] = useState(false)
    const [invoice, setInvoice] = useState({
        buktiPembayaran: "",
        emailPenyewa: "",
        hargaKontrakan: "",
        idKontrakan: "",
        lamaSewa: "",
        namaKontrakan: "",
        namaPenyewa: "",
        status: "",
        totalHarga: null,
    });

    const invoiceSet = (item, index) => {
        const sample = { ...item };
        sample.id = index + 1;
        setInvoice(sample);
    }

    const openFullScreenImage = (
        <Box
            display='flex' justifyContent='center' flexDirection='column'
            position='fixed' top='0px' left='0px' right='0px' bottom='0px' zIndex='99999'>

            <Box zIndex='1' onClick={() => fullScreenShowSet(false)}
                display='flex' justifyContent='center' position='fixed' top='0px' left='0px' right='0px' bottom='0px' bg='rgba(0,0,0,.7)' /> {/* overlay */}

            <Image alignSelf='center' src={UrlGambarKontrakanOpen} width={['85%', '65%']} zIndex='10' />
        </Box>
    )

    const UBAH_KESEWA = (id) => {
        btnLoadingSet(true);
        Axios.get(`${restApi}/kontrakan/${id}/sewa`)
            .then(() => {
                Alerting('Kontrakan berhasil disewa', 'success');
                btnLoadingSet(false);
            })
            .catch(err => {
                Alerting(err.message, 'error');
                btnLoadingSet(false);
            })
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const Invoice = () => {
        return invoice.namaPenyewa !== '' && (
            <Box ref={ref} my={5} w='100%' display='flex' justifyContent='center'>
                <div style={{ width: '65%', border: '1px solid #333', padding: 10 }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h1 style={{ fontWeight: 'bold' }}>Rumah Kontrak</h1>
                            <p>fajarfebriansyah.rian@gmail.com</p>
                            <p>081297608982</p>
                        </div>

                        <div>
                            Invoice {invoice.id}
                        </div>
                    </div>

                    <div style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
                        <p>Nama Penyewa: <span fontWeight='bold'>{invoice.namaPenyewa}</span></p>
                        <p>Email Penyewa: <span fontWeight='bold'>{invoice.emailPenyewa}</span></p>
                        <p>Unit Kontrakan: <span fontWeight='bold'>{invoice.namaKontrakan}</span></p>
                        <p>Harga Unit: <span fontWeight='bold'>{invoice.hargaKontrakan}</span></p>
                        <p>Lama Sewa: <span fontWeight='bold'>{invoice.lamaSewa}</span> bulan</p>
                        <p>Total Harga: <span fontWeight='bold'>Rp {invoice.totalHarga === null ? null : numberWithCommas(invoice.totalHarga)}</span></p>
                    </div>
                </div>
            </Box>
        )
    }
    return (
        <>
            <Box>
                <Text fontFamily='nunito' fontSize='2xl' fontWeight='bold'>Transaksi</Text>

                <table style={{
                    marginTop: 50, width: '100%', borderWidth: '1px 1px 1px 1px', borderStyle: 'solid', borderColor: '#333'
                }}>
                    <tr style={{ borderBottom: '1px solid #333', }}>
                        {TH.map(item => <th style={{ borderRight: '1px solid #333', width: item.label === 'Bukti Pembayaran' ? 150 : 'auto' }} key={item.label}>{item.label}</th>)}
                    </tr>

                    {data.map((item, index) => (
                        <tr style={{ textAlign: 'center', borderBottom: '1px solid #333', background: index % 2 !== 0 ? '#e0e0e0' : '#fff' }}>
                            <td style={{ borderRight: '1px solid #333' }}>{index + 1}</td>
                            <td style={{ borderRight: '1px solid #333' }}>{item.namaPenyewa}</td>
                            <td style={{ borderRight: '1px solid #333' }}>{item.emailPenyewa}</td>
                            <td style={{ borderRight: '1px solid #333' }}>{item.namaKontrakan}</td>
                            <td style={{ borderRight: '1px solid #333' }}>Rp {item.hargaKontrakan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                            <td style={{ borderRight: '1px solid #333' }}>{item.lamaSewa}</td>
                            <td style={{ borderRight: '1px solid #333' }}>Rp {item.totalHarga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                            <td style={{ display: 'flex', justifyContent: 'center' }}>
                                <Image src={item.buktiPembayaran} width='100px' cursor='pointer' onClick={() => {
                                    UrlGambarKontrakanOpenSet(item.buktiPembayaran);
                                    fullScreenShowSet(true);
                                }} />
                            </td>
                            <td style={{ borderLeft: '1px solid #333' }}>
                                {item.buktiPembayaran !== '' ? item.status === '0' ?
                                    <Text>sudah disewa</Text>
                                    :
                                    <Popover usePortal>
                                        <PopoverTrigger>
                                            <Button isLoading={btnLoading} bg='primary' color='#fff'>
                                                Ubah ke sewa
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent zIndex={4}>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody>
                                                <Text width='85%' fontFamily='nunito'>Anda yakin ingin ubah ke sewa kontrakan ini ?</Text>
                                                <Button isLoading={btnLoading} bg='primary' color='#fff' onClick={() => UBAH_KESEWA(item.idKontrakan)} >Ubah ke sewa</Button>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover> : null}
                            </td>
                            <td>
                                {typeof invoice === 'object' && invoice.id === index + 1 ?
                                    <Pdf targetRef={ref} filename="invoice.pdf">
                                        {({ toPdf }) => <Button onClick={toPdf}>Download</Button>}
                                    </Pdf> : <Button onClick={() => invoiceSet(item, index)} >Invoice</Button>
                                }
                            </td>
                        </tr>
                    ))}
                </table>
            </Box>
            {fullScreenShow ? openFullScreenImage : null}
            {Invoice()}
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

export default connect(storeToProps, dispathToStore)(Transaksi);