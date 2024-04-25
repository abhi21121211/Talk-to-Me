import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer';
import { Box } from '@chakra-ui/react';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';


function ChatPage() {

  const { user } = ChatState();


  return (
    <div style={{ width: "100%" }}>

      {user && <SideDrawer />}
      <Box>

        Chat ChatPage
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}

export default ChatPage
