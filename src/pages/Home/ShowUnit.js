import React, { useState } from 'react';
import { Flex, Text, SimpleGrid, Box, Image, Skeleton, useDisclosure } from '@chakra-ui/core';
import { FaBed, FaBath } from 'react-icons/fa'
import { AiOutlineQrcode, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Fade from 'react-reveal/Fade';
import MyButton from '../../components/MyComponents/MyButton';
import MyModal from '../../components/MyComponents/MyModal';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const PalingBanyakDilihat = ({ title, data, isLoading, userData, noqr }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [qrcodePathname, qrcodePathnameSet] = useState('');

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

    const ItemClicked = () => {

    }
    return (
        <>
            <Fade>
                <Flex my='100px' flexDir='column' fontFamily='nunito'>
                    <Text fontFamily='overlock'
                        mb='20px'
                        fontSize={['2xl', '2xl', '3xl']} fontWeight='900' textAlign={['center', 'left']}>
                        {title}
                    </Text>

                    <SimpleGrid columns={[2, 2, 2, 4]} spacing={[3, 3, 10]}>
                        {isLoading ? TheSkeleton() : data.length === 0 ? <Text fontFamily='nunito'>Belum Ada</Text>
                            :
                            data.map(item => (
                                <div className='activeClicked' key={item.idKontrakan}>
                                    <Box width='250px'
                                        maxW="sm" fontFamily='nunito' boxShadow='1px 1px 10px rgba(0,0,0,.1)'
                                        borderWidth="1px" rounded="lg" overflow="hidden" >

                                        <NavLink to={`/kontrakan/${item.idKontrakan}`} >
                                            <Image onClick={ItemClicked} cursor='pointer' width='100%' height='200px' src={item.urlGambarKontrakan[0]} alt={item.namaKontrakan} />
                                        </NavLink>

                                        <Box p={["2", "6"]}>
                                            <Box
                                                mt="1"
                                                lineHeight="tight"
                                                isTruncated
                                                display='flex' alignItems='center' justifyContent='space-between'
                                                flexDir='row'
                                            >
                                                <NavLink to={`/kontrakan/${item.idKontrakan}`} >
                                                    <Text
                                                        fontWeight="semibold"
                                                        fontSize={['16px', 'lg']}
                                                        fontFamily='nunito'
                                                        cursor='pointer'
                                                        onClick={ItemClicked}>{item.namaKontrakan}</Text>
                                                </NavLink>

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
                                                    <AiFillHeart fill='#b93333' style={{ cursor: 'pointer' }} />
                                                    :
                                                    <AiOutlineHeart fill='#999' style={{ cursor: 'pointer' }} />}
                                            </Flex>

                                        </Box>
                                    </Box>
                                </div>
                            ))}
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