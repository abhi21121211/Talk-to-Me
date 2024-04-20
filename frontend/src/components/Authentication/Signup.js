import React, { useState, useEffect } from 'react';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState('');
    const [picLoading, setPicLoading] = useState(false);
    const [redirect, setRedirect] = useState(false); // State for redirection
    const toast = useToast();

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submitHandler = async () => {
        setPicLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(name, email, password, pic);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user",
                {
                    name,
                    email,
                    password,
                    pic,
                },
                config
            );
            console.log(data);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setPicLoading(false);
            // history.push("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
        }
    };

    // useEffect(() => {
    //     // Use effect to navigate when redirect flag changes to true
    //     if (redirect) {
    //         // Perform redirection or navigation here using window.location or other methods
    //         window.location.href = '/chats'; // Example: Redirect to '/chats' route
    //     }
    // }, [redirect]);

    const handleImageUpload = (selectedFile) => {
        setPicLoading(true);

        if (!selectedFile) {
            toast({
                title: 'Please select an image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setPicLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'Talk-to-Me');
        formData.append('cloud_name', 'dvnoea6wo');

        fetch('https://api.cloudinary.com/v1_1/dvnoea6wo/image/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setPic(data.url);
                setPicLoading(false);
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
                setPicLoading(false);
            });
    };

    return (
        <VStack spacing="5px" maxW="400px" m="auto">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input type="email" placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleTogglePasswordVisibility}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="confirm-password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleTogglePasswordVisibility}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="pic">
                <FormLabel>Upload Your Picture</FormLabel>
                <Input type="file" p={1.5} accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0])} />
            </FormControl>
            <Button colorScheme="blue" width="100%" style={{ marginTop: '15px' }} onClick={submitHandler} isLoading={picLoading}>
                Sign Up
            </Button>
        </VStack>
    );
};



export default Signup;

