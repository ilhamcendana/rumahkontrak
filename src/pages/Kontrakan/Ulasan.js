import React from 'react';
import { Box, Text, Flex, Icon, Button, useDisclosure, Textarea } from '@chakra-ui/core';
import MyButton from '../../components/MyComponents/MyButton';
import MyModal from '../../components/MyComponents/MyModal';
import { useState } from 'react';
import Axios from 'axios';
import qs from 'qs';

const Ulasan = ({ isAuth, data, onOpenLogin, restApi, userData, Alerting, id, cbFetch }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const countStars = rating => {
        const rate = [1, 2, 3, 4, 5];
        return rate.map(item => <Icon name='star' color={item <= rating ? '#ff9800' : '#999'} />)
    }

    const [ulasan, ulasanSet] = useState({
        komentar: '',
        rating: 0
    })

    const [btnLoading, btnLoadingSet] = useState(false);

    const ulasanChange = (type, val) => {
        ulasanSet(prev => {
            return { ...prev, [type]: val }
        })
    }

    const KIRIM_ULASAN = () => {
        btnLoadingSet(true);
        Axios({
            method: 'post',
            url: `${restApi}/kontrakan/${id}/ulasan`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify({ uid: userData.uid, komentar: ulasan.komentar, rating: ulasan.rating })
        })
            .then(() => {
                Alerting('Komentar dikirim', 'success')
                btnLoadingSet(false);
                onClose();
                cbFetch()
            })
            .catch(err => {
                Alerting(err.message, 'error')
                btnLoadingSet(false);
            })
    }

    return (
        <>
            <Box width={['100%', '50%']}>
                <Flex>
                    <Text mr='4' fontFamily='overlock' fontWeight='bold' fontSize='2xl'>Ulasan</Text>
                    <Button variant='outline' onClick={isAuth ? onOpen : onOpenLogin}>Buat Ulasan</Button>
                </Flex>

                <Box mt='30px' height='400px' overflow='scroll' paddingRight='10px' >
                    {data.map(item => (
                        <Box key={item.uid} mb='30px'>
                            <Flex alignItems='center' justifyContent='space-between'>
                                <Text fontWeight='bold' fontFamily='nunito' fontSize='lg'>{item.displayName}</Text>
                                <Flex>
                                    {countStars(item.rating)}
                                </Flex>
                            </Flex>
                            <Text fontFamily='nunito'>{item.komentar}</Text>
                        </Box>
                    ))}
                </Box>
            </Box>

            <MyModal isOpen={isOpen} onClose={onClose} title={'Buat Ulasan'} >
                <Box width='100%'>
                    {[1, 2, 3, 4, 5].map(item => (
                        <Icon name='star' color={item <= ulasan.rating ? '#ff9800' : '#999'} cursor='pointer' className='stars' onClick={() => ulasanChange('rating', item)} />
                    ))}

                    <Textarea mt='3' width='100%' placeholder='Komentar' onChange={e => ulasanChange('komentar', e.target.value)} />

                    <MyButton mt='4' isLoading={btnLoading} onClick={KIRIM_ULASAN} >Kirim</MyButton>
                </Box>
            </MyModal>
        </>
    );
}

export default Ulasan;