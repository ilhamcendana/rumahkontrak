import React, { useState } from 'react';
import { Flex, Text, SimpleGrid, Box, Image, Skeleton, useDisclosure, Button, Icon, Popover, PopoverTrigger, PopoverContent, PopoverCloseButton, PopoverBody, PopoverArrow, } from '@chakra-ui/core';
import { FaBed, FaBath } from 'react-icons/fa'
import { AiOutlineQrcode, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Fade from 'react-reveal/Fade';
import MyButton from '../../components/MyComponents/MyButton';
import MyModal from '../../components/MyComponents/MyModal';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';

const PalingBanyakDilihat = ({ title, data, isLoading, userData, noqr, noActionBtn, add, addClicked, restApi, Alerting, cbFetch, noDel }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [qrcodePathname, qrcodePathnameSet] = useState('');
    const [btnLoading, btnLoadingSet] = useState(false);

    const TheSkeleton = () => {
        return [1, 2, 3, 4].map((item) => (
            <Box key={item}>
                <Skeleton mb='1' height="150px" />
                <Skeleton mb='1' height="10px" />
                <Skeleton mb='1' height="10px" />
                <Skeleton mb='1' height="10px" />
                <Skeleton mb='1' height="10px" />
            </Box>
        ))
    }

    const deleteItemClicked = (id) => {
        btnLoadingSet(true);
        Axios.post(`${restApi}/kontrakan/${id}/hapus`)
            .then(res => {
                Alerting('Kontrakan dihapus', 'success')
                btnLoadingSet(false);
                cbFetch()
            })
            .catch(err => {
                Alerting(err.message, 'error')
                btnLoadingSet(false);
            })
    }

    const Cardnya = (item) => {
        return <div className='activeClicked' key={item.idKontrakan}>
            <Box
                maxW="md" fontFamily='nunito' boxShadow='1px 1px 10px rgba(0,0,0,.1)'
                borderWidth="1px" rounded="lg" overflow="hidden" >


                <Image src={item.urlGambarKontrakan[0]} alt={item.namaKontrakan} />


                <Box p={["2", "6"]}>
                    <Box
                        mt="1"
                        lineHeight="tight"
                        isTruncated
                        display='flex' alignItems='center' justifyContent='space-between'
                        flexDir='row'
                    >

                        <Text
                            fontWeight="semibold"
                            fontSize={['16px', 'lg']}
                            fontFamily='nunito'
                        >{item.namaKontrakan}</Text>


                        {noqr ? null : <MyButton
                            onClick={() => {
                                qrcodePathnameSet(item.idKontrakan);
                                onOpen();
                            }}
                            bg='transparent' color='#000' fontSize='2xl' _hover={{ transform: 'scale(1.5)' }} ><AiOutlineQrcode /></MyButton>}
                    </Box>

                    <Box d="flex" alignItems="baseline">
                        <Flex
                            width='100%'
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="12px"
                            textTransform="uppercase"
                        >
                            <Flex mr='2' alignItems='center'><Text mr='1' fontFamily='nunito'>{item.KT}</Text> <FaBed /></Flex>
                                        &bull;
                                        <Flex ml='2' alignItems='center'><Text mr='1' fontFamily='nunito'>{item.KM}</Text> <FaBath /></Flex>
                        </Flex>
                    </Box>

                    <Box fontSize={['xs', 'sm']} fontWeight='bold'>
                        Rp {item.hargaKontrakan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} / Bulan
                                            </Box>

                    <Flex alignItems='center' justifyContent='space-between'>
                        <Text fontSize='9px' fontFamily='nunito' >{moment(item.publishDate, "YYYYMMDD").fromNow()}</Text>
                        {item.disimpanUser.includes(userData.uid) ?
                            <AiFillHeart fill='#b93333' />
                            :
                            <AiOutlineHeart fill='#999' />}
                    </Flex>

                    {!noActionBtn ? <Flex mt='4'>
                        <Link to={`/buat-kontrakan/${item.idKontrakan}`}>
                            <Button bg='primary' mr='3' color='#fff'>
                                <Icon name='edit' />
                            </Button>
                        </Link>

                        {noDel ? null : <Popover usePortal>
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
                                    <Button onClick={() => deleteItemClicked(item.idKontrakan)} bg='danger' color='#fff' >Hapus</Button>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>}
                    </Flex> : null}

                </Box>
            </Box>
        </div>
    }
    return (
        <>
            <Fade>
                <Flex my='50px' flexDir='column' fontFamily='nunito'>
                    <Text fontFamily='overlock'
                        mb='20px'
                        fontSize={['2xl', '2xl', '3xl']} fontWeight='900' textAlign={['center', 'left']}>
                        {title}
                    </Text>

                    <SimpleGrid columns={[2, 2, 2, 4]} spacing={[3, 3, 10]}>
                        {add ? <Box cursor='pointer' className='activeClicked' onClick={addClicked}
                            background='#cdcdcd' rounded='lg' color='#fff' display='flex' justifyContent='center' alignItems='center'>
                            <Icon name='add' size='3em' />
                        </Box> : null}

                        {isLoading ? TheSkeleton()
                            : data.length === 0 ? <Text fontFamily='nunito'>Belum Ada</Text> :
                                data.map(item => Cardnya(item))}
                    </SimpleGrid>
                </Flex>
            </Fade>

            <MyModal isOpen={isOpen} onClose={onClose} title='QR CODE'>
                <QRCode value={`${window.location.host}/kontrakan/${qrcodePathname}`} />
            </MyModal>
        </>
    );
}

const storeToProps = state => {
    return {
        userData: state.userData
    }
}

export default connect(storeToProps)(PalingBanyakDilihat);