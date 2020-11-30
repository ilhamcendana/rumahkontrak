import React from 'react';
import { SlideIn, Modal, ModalHeader, ModalCloseButton, ModalBody, ModalOverlay, ModalContent } from '@chakra-ui/core';


const MyModal = (props) => {
    const { isOpen, onClose, title, children, size } = props;
    return (
        <SlideIn in={isOpen}>
            {styles => (
                <Modal size={size ? size : ['sm', 'md']} onClose={onClose} isOpen={true}>
                    <ModalOverlay opacity={styles.opacity} />
                    <ModalContent pb={5} {...styles}>
                        <ModalHeader fontFamily='nunito' fontWeight='bold'>{title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody {...props} display='flex' justifyContent='center'>
                            {children}
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </SlideIn>
    );
}

export default MyModal;