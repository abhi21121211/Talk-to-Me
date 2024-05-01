import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { user, chats, setChats } = ChatState();

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);


            
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            
        }

        
    }

    const handleGroup = (userToAdd) => {
        

    }

    const handleSubmit = async () => {
        
    }

  return (
      <>
          <span onClick={onOpen}>{children}</span>
          <Modal open={isOpen} onClose={onClose}
          >
              <ModalOverlay>
                  <ModalContent>
                      <ModalHeader fontSize="20px" fontFamily="Sniglet" display="flex" justifyContent="center">
                          Create Group Chat
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody display="flex" flexDir="column" alignItems="center" justifyContent="space-between"
                      >
                          <FormControl>
                              <Input placeholder='Chat Name' mb={3} onChange={(e) => setGroupChatName(e.target.value)} />
                          </FormControl>
                          <FormControl>
                              <Input placeholder='Add Users' mb={1} onChange={(e) => setSearch(e.target.value)} />
                          </FormControl>
                          
                      </ModalBody>

                      <ModalFooter>
                          <Button colorScheme='blue'  onClick={handleSubmit}>
                              Close
                          </Button>
                         
                      </ModalFooter>
                          
                          
                  </ModalContent>
              </ModalOverlay>
          </Modal>
      
    </>
  )
}

export default GroupChatModal
