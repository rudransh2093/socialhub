import { VStack, Flex, FormControl, Input, Button, FormLabel, Heading, Text } from "@chakra-ui/react";
import { register } from "../api/endpoints";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password === confirmPassword) {
            try {
                await register(username, email, name, password);
                alert('successful registration')
                navigate('/login')
            } catch (err) {
                console.error('Registration error:', err);
                if (err.response?.data) {
                    const errors = err.response.data;
                    const errorMessages = Object.keys(errors)
                        .map(key => {
                            const val = errors[key];
                            return `${key}: ${Array.isArray(val) ? val.join(', ') : val}`;
                        })
                        .join('\n');
                    alert(`Registration failed:\n${errorMessages}`);
                } else {
                    alert('Error registering');
                }
            }
            
        } else {
            alert('password and confirm password are not identical')
        }
    }

    const handleNav = () => {
        navigate('/login')
    }

    return (
        <Flex w='100%' minH='calc(100vh - 80px)' justifyContent='center' alignItems='center' py="40px">
            <VStack 
              alignItems='stretch' 
              w='95%' 
              maxW='450px' 
              gap='20px'
              bg="rgba(255, 255, 255, 0.02)"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255, 255, 255, 0.08)"
              borderRadius="24px"
              p={{ base: "30px 24px", sm: "40px" }}
              boxShadow="0 12px 40px rgba(0,0,0,0.3)"
            >
                <VStack alignItems='start' spacing={1} mb="10px">
                    <Heading 
                      fontSize="32px" 
                      fontWeight="800" 
                      bgGradient="linear(to-r, #6366F1, #A855F7, #EC4899)" 
                      bgClip="text"
                    >
                      Create Account
                    </Heading>
                    <Text color="gray.400" fontSize="14px">
                      Sign up to start sharing and connecting.
                    </Text>
                </VStack>

                <FormControl>
                    <FormLabel htmlFor='username' fontSize="14px" fontWeight="600" color="gray.300" mb="6px">Username</FormLabel>
                    <Input id='username' onChange={(e) => setUsername(e.target.value)} type='text' h="44px" placeholder="Choose a username" />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='email' fontSize="14px" fontWeight="600" color="gray.300" mb="6px">Email</FormLabel>
                    <Input id='email' onChange={(e) => setEmail(e.target.value)} type='email' h="44px" placeholder="Enter your email" />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='name' fontSize="14px" fontWeight="600" color="gray.300" mb="6px">Name</FormLabel>
                    <Input id='name' onChange={(e) => setName(e.target.value)} type='text' h="44px" placeholder="Your display name" />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='password' fontSize="14px" fontWeight="600" color="gray.300" mb="6px">Password</FormLabel>
                    <Input id='password' onChange={(e) => setPassword(e.target.value)} type='password' h="44px" placeholder="Create a password" />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='confirmPassword' fontSize="14px" fontWeight="600" color="gray.300" mb="6px">Confirm Password</FormLabel>
                    <Input id='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} type='password' h="44px" placeholder="Confirm your password" />
                </FormControl>
                
                <VStack w="100%" alignItems="stretch" gap="12px" mt="10px">
                    <Button onClick={handleRegister} h="48px" fontSize="16px" variant="solid">
                        Register
                    </Button>
                    <Text 
                        onClick={handleNav} 
                        fontSize="14px" 
                        color="gray.400" 
                        _hover={{ color: "#6366F1" }} 
                        cursor="pointer" 
                        textAlign="center"
                    >
                        Already have an account? <Text as="span" fontWeight="bold" color="indigo.300" _hover={{ textDecoration: 'underline' }}>Log in</Text>
                    </Text>
                </VStack>
            </VStack>
        </Flex>
    )
}

export default Register;