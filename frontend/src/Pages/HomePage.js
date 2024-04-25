import React, { useEffect } from 'react';
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      // Redirect to "/chats" if user info exists
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d='flex'
        justifyContent='center'
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="Sniglet"
          color="black"
          textAlign="center"
        >
          Talk to Me
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} color="black" borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded'>
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
