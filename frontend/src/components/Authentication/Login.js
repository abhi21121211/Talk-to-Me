import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
// import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    // const { setUser } = ChatState();

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post("/api/user/login", { email, password }, config);

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            // setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            // Do not use history.push, set a state variable for redirection
            setIsLoggedIn(true); // Set a state variable for successful login
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: error.response.data.message || "Something went wrong",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

    // State variable to track login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Use useEffect to perform redirection upon successful login
    useEffect(() => {
        if (isLoggedIn) {
            // Perform redirection to /chats route or any other route upon successful login
            window.location.href = "/chats"; // Use window.location to navigate
        }
    }, [isLoggedIn]);

    return (
        <VStack spacing="10px">
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                    setEmail("guest@example.com");
                    setPassword("123456");
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    );
};

export default Login;
