import React from 'react';
import { Button } from '@chakra-ui/core';

const MyButton = (props) => {
    return (
        <Button
            {...props}
            variant='solid'
            color={props.color || '#fff'}
            fontFamily='Nunito'
            bg={props.bg || 'primary'}
            _hover={props._hover || { opacity: .8 }}
            _active={props._active || { transform: 'scale(.95)' }}
            _focus={{ outline: 'none' }}

        >
            {props.children}
        </Button>
    );
}

export default MyButton;