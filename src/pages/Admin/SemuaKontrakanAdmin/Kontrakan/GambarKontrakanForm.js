import React, { useState } from 'react';
import { Flex, Image, Box, Icon } from '@chakra-ui/core';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import MyButton from '../../../../components/MyComponents/MyButton';
import { useRef } from 'react';

const GambarKontrakan = ({ urlGambarKontrakan, text, dataSet, imageFileSet, onChangeImage, btnLoading }) => {
    const [fullScreenShow, fullScreenShowSet] = useState(false);
    const [indexOpenedImage, indexOpenedImageSet] = useState(0);
    const myRef = useRef(null);

    // const (e) =>onChangeImage(e.target) = (e) => {
    //     const filenya = e.target.files[0]
    //     imageFileSet(prev => {
    //         let after = [...prev];
    //         after.push(filenya);
    //         return after;
    //     })


    //     if (e.target.files && e.target.files[0]) {
    //         if (e.target.files[0].size > 2097152) return alert("File is too big!");
    //     }
    // }

    const displayImage = (
        urlGambarKontrakan.length === 1 ?
            <Flex w='100%'>
                <Image
                    onClick={() => { indexOpenedImageSet(0); fullScreenShowSet(true); }} borderRadius='10px'
                    className='activeClicked' cursor='pointer' alignSelf='center' src={urlGambarKontrakan[0]} width='100%' height='500px' />
            </Flex> : urlGambarKontrakan.length === 2 ?
                <Flex w='100%' justifyContent='space-between'>
                    <Image
                        onClick={() => { indexOpenedImageSet(0); fullScreenShowSet(true); }} borderRadius='10px'
                        className='activeClicked' cursor='pointer' alignSelf='center' src={urlGambarKontrakan[0]} width='49.9%' height='400px' />
                    <Image
                        onClick={() => { indexOpenedImageSet(1); fullScreenShowSet(true); }} borderRadius='10px'
                        className='activeClicked' cursor='pointer' alignSelf='center' src={urlGambarKontrakan[1]} width='49.9%' height='400px' />
                </Flex> :
                <Flex w='100%' justifyContent='space-between' flexDirection={['column', 'row']}>
                    <Image
                        onClick={() => { indexOpenedImageSet(0); fullScreenShowSet(true); }} borderRadius='10px'
                        className='activeClicked' cursor='pointer' alignSelf='center' src={urlGambarKontrakan[0]} width={['100%', '64%']} height={['250px', '230px', '300px', '500px']} mb={['10px', '0px']} />

                    <Flex flexDir={['row', 'column']} width={['100%', '35%']} justifyContent='space-between'>
                        <Image
                            onClick={() => { indexOpenedImageSet(1); fullScreenShowSet(true); }} borderRadius='10px'
                            className='activeClicked' cursor='pointer' alignSelf='center' src={urlGambarKontrakan[1]} width={['49%', '100%']} height={['130px', '114px', '145px', '245px']} />
                        <Image
                            onClick={() => { indexOpenedImageSet(2); fullScreenShowSet(true); }} borderRadius='10px'
                            className='activeClicked' cursor='pointer' alignSelf='center' src={urlGambarKontrakan[2]} width={['49%', '100%']} height={['130px', '114px', '145px', '245px']} />
                    </Flex>
                </Flex>
    )

    const openFullScreenImage = (
        <Box
            display='flex' justifyContent='center' flexDirection='column'
            position='fixed' top='0px' left='0px' right='0px' bottom='0px' zIndex='99999'>

            <Box zIndex='1' onClick={() => fullScreenShowSet(false)}
                display='flex' justifyContent='center' position='fixed' top='0px' left='0px' right='0px' bottom='0px' bg='rgba(0,0,0,.7)' /> {/* overlay */}

            <IoIosArrowBack onClick={() => indexOpenedImageSet(prev => prev === 0 ? urlGambarKontrakan.length - 1 : prev - 1)}
                style={{ color: '#fff', zIndex: '10', position: 'absolute', left: 50, top: '50vh', fontSize: '2.5rem', cursor: 'pointer' }} />
            <IoIosArrowForward onClick={() => indexOpenedImageSet(prev => prev === (urlGambarKontrakan.length - 1) ? prev - prev : prev + 1)}
                style={{ color: '#fff', zIndex: '10', position: 'absolute', right: 50, top: '50vh', fontSize: '2.5rem', cursor: 'pointer' }} />

            <Box position='relative' width={['85%', '65%']} zIndex='10' height='70vh' alignSelf='center'>
                {urlGambarKontrakan.length !== 0 ? <Icon cursor='pointer' name='small-close' bg='danger' borderRadius='50%' color='#fff' position='absolute' left='20px' top='20px' fontSize='2rem' zIndex='1000'
                    onClick={() => {
                        imageFileSet(prev => prev.filter((item, index) => index !== indexOpenedImage));
                        dataSet(prev => {
                            let sample = [...prev.urlGambarKontrakan];
                            const nih = sample.filter((item, index) => index !== indexOpenedImage)
                            return {
                                ...prev,
                                urlGambarKontrakan: nih
                            }
                        })
                    }} /> : null}
                <Image alignSelf='center' src={urlGambarKontrakan[indexOpenedImage]} width={'100%'} zIndex='10' height='70vh' />
            </Box>

            <Flex zIndex='10' width='90%' alignSelf='center' justifyContent='center' mt='4'>
                {urlGambarKontrakan.map((item, index) =>
                    <Image src={item} mx='1' key={index}
                        onClick={() => indexOpenedImageSet(index)}
                        width='100px' cursor='pointer' border={indexOpenedImage === index ? '2px solid #fff' : '0px'} />
                )}
            </Flex>
        </Box>
    )

    return (
        <Flex width='100%' alignItems='center' flexDir='column'>
            <MyButton isLoading={btnLoading} onClick={() => myRef.current.click()} alignSelf='flex-start' mb='2'>Unggah Foto</MyButton>
            <input onChange={(e) => onChangeImage(e.target.files[0])} ref={myRef} style={{ display: 'none' }} type="file" accept="image/x-png,image/jpeg" />
            {displayImage}
            {fullScreenShow ? openFullScreenImage : null}
        </Flex>
    );
}

export default GambarKontrakan;