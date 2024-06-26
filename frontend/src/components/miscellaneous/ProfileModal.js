import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text } from '@chakra-ui/react'
import React from 'react'

function ProfileModal({ user, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <>
            {children ? (<span onClick={onOpen}>{children}</span>) : (<IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />)}

            <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent h="410px">
                    <ModalHeader
                        fontSize="20px"
                        fontFamily="Sniglet"
                        display="flex"
                        justifyContent="center"
                    >{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex" flexDirection="column" alignItems="center"
                    justifyContent="space-between">
                        <Image src={user.pic} alt={user.name} borderRadius="full" boxSize="150px" />
                        <Text >{ user.email}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        
                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    )
}

export default ProfileModal
