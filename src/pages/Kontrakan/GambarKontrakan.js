import React, { useState } from 'react';
import { Flex, Image, Box } from '@chakra-ui/core';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const GambarKontrakan = ({ UrlGambarKontrakan, text }) => {
    const [fullScreenShow, fullScreenShowSet] = useState(false);
    const [indexOpenedImage, indexOpenedImageSet] = useState(0);

    const displayImage = (
        UrlGambarKontrakan.length === 1 ?
            <Flex w='100%'>
                <Image
                    onClick={() => { indexOpenedImageSet(0); fullScreenShowSet(true); }} borderRadius='10px'
                    className='activeClicked' cursor='pointer' alignSelf='center' src={UrlGambarKontrakan[0]} width='100%' height='500px' />
            </Flex> : UrlGambarKontrakan.length === 2 ?
                <Flex w='100%' justifyContent='space-between'>
                    <Image
                        onClick={() => { indexOpenedImageSet(0); fullScreenShowSet(true); }} borderRadius='10px'
                        className='activeClicked' cursor='pointer' alignSelf='center' src={UrlGambarKontrakan[0]} width='49.9%' height='400px' />
                    <Image
                        onClick={() => { indexOpenedImageSet(1); fullScreenShowSet(true); }} borderRadius='10px'
                        className='activeClicked' cursor='pointer' alignSelf='center' src={UrlGambarKontrakan[1]} width='49.9%' height='400px' />
                </Flex> :
                <Flex w='100%' justifyContent='space-between' flexDirection={['column', 'row']}>
                    <Image
                        onClick={() => { indexOpenedImageSet(0); fullScreenShowSet(true); }} borderRadius='10px'
                        className='activeClicked' cursor='pointer' alignSelf='center' src={UrlGambarKontrakan[0]} width={['100%', '64%']} height={['250px', '230px', '300px', '500px']} mb={['10px', '0px']} />

                    <Flex flexDir={['row', 'column']} width={['100%', '35%']} justifyContent='space-between'>
                        <Image
                            onClick={() => { indexOpenedImageSet(1); fullScreenShowSet(true); }} borderRadius='10px'
                            className='activeClicked' cursor='pointer' alignSelf='center' src={UrlGambarKontrakan[1]} width={['49%', '100%']} height={['130px', '114px', '145px', '245px']} />
                        <Image
                            onClick={() => { indexOpenedImageSet(2); fullScreenShowSet(true); }} borderRadius='10px'
                            className='activeClicked' cursor='pointer' alignSelf='center' src={UrlGambarKontrakan[2]} width={['49%', '100%']} height={['130px', '114px', '145px', '245px']} />
                    </Flex>
                </Flex>
    )

    const openFullScreenImage = (
        <Box
            display='flex' justifyContent='center' flexDirection='column'
            position='fixed' top='0px' left='0px' right='0px' bottom='0px' zIndex='99999'>

            <Box zIndex='1' onClick={() => fullScreenShowSet(false)}
                display='flex' justifyContent='center' position='fixed' top='0px' left='0px' right='0px' bottom='0px' bg='rgba(0,0,0,.7)' /> {/* overlay */}

            <IoIosArrowBack onClick={() => indexOpenedImageSet(prev => prev === 0 ? UrlGambarKontrakan.length - 1 : prev - 1)}
                style={{ color: '#fff', zIndex: '10', position: 'absolute', left: 50, top: '50vh', fontSize: '2.5rem', cursor: 'pointer' }} />
            <IoIosArrowForward onClick={() => indexOpenedImageSet(prev => prev === (UrlGambarKontrakan.length - 1) ? prev - prev : prev + 1)}
                style={{ color: '#fff', zIndex: '10', position: 'absolute', right: 50, top: '50vh', fontSize: '2.5rem', cursor: 'pointer' }} />

            <Image alignSelf='center' src={UrlGambarKontrakan[indexOpenedImage]} width={['85%', '65%']} zIndex='10' />

            <Flex zIndex='10' width='90%' alignSelf='center' justifyContent='center' mt='4'>
                {UrlGambarKontrakan.map((item, index) =>
                    <Image src={item} mx='1'
                        onClick={() => indexOpenedImageSet(index)}
                        width='100px' cursor='pointer' border={indexOpenedImage === index ? '2px solid #fff' : '0px'} />
                )}
            </Flex>
        </Box>
    )

    return (
        <Flex width='100%' justifyContent='center'>
            {displayImage}
            {fullScreenShow ? openFullScreenImage : null}
        </Flex>
    );
}

export default GambarKontrakan;