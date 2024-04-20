import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Toast, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
// import { v2 as cloudinary } from 'cloudinary';
function Signup() {
    const [show, setShow] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();


    
    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "Talk-to-me");
            data.append("cloud_name", "dvnoea6wo");
            fetch("https://api.cloudinary.com/v1_1/abhidukare111/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }

    const submitHandler = () => {

    }

    return (
        <VStack>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder='Enter Your Name' onClick={(e) => setName(e.target.value)} />

            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter Your Email' onClick={(e) => setEmail(e.target.value)} />

            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter Your Password' onClick={(e) => setPassword(e.target.value)} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</Button>

                    </InputRightElement>

                </InputGroup>
            </FormControl>



            <FormControl id='pic' isRequired>
                <FormLabel>Profile Picture</FormLabel>
                <Input type="file" p={1.5} accept='image/*' onClick={(e) => postDetails(e.target.files[0])} />

            </FormControl>

            <Button colorScheme='blue' width='100%' onClick={submitHandler} style={
                { marginTop: 15 }
            }>

                Sign Up
            </Button>

        </VStack>
    )
}

export default Signup
