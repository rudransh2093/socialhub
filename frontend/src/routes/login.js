import { VStack, Flex, Text, FormControl, Input, Button, FormLabel, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/useAuth";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { auth_login } = useAuth();

    const handleLogin = async () => {
        setLoading(true)
        try {
            await auth_login(username, password)
        } finally {
            setLoading(false)
        }
    }

    const handleNav = () => {
        navigate('/register')
    }

    return (
        <Flex w='100%' h='calc(100vh - 80px)' justifyContent='center' alignItems='center'>
            <VStack 
              alignItems='stretch' 
              w='95%' 
              maxW='420px' 
              gap='24px'
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
                      Welcome Back
                    </Heading>
                    <Text color="gray.400" fontSize="14px">
                      Enter your details to log in to your account.
                    </Text>
                </VStack>
                
                <FormControl>
                    <FormLabel htmlFor='username' fontSize="14px" fontWeight="600" color="gray.300" mb="8px">
                      Username
                    </FormLabel>
                    <Input 
                      id='username'
                      onChange={(e) => setUsername(e.target.value)} 
                      type='text' 
                      placeholder="Enter your username"
                      h="48px"
                    />
                </FormControl>
                
                <FormControl>
                    <FormLabel htmlFor='password' fontSize="14px" fontWeight="600" color="gray.300" mb="8px">
                      Password
                    </FormLabel>
                    <Input 
                      id='password'
                      onChange={(e) => setPassword(e.target.value)} 
                      type='password' 
                      placeholder="Enter your password"
                      h="48px"
                    />
                </FormControl>
                
                <VStack w='100%' alignItems='stretch' spacing={4} mt="10px">
                    <Button onClick={handleLogin} isLoading={loading} h="48px" fontSize='16px' variant="solid">
                      Log In
                    </Button>
                    <Text 
                      onClick={handleNav} 
                      fontSize='14px' 
                      color='gray.400' 
                      _hover={{ color: '#6366F1' }} 
                      cursor='pointer' 
                      textAlign="center"
                    >
                      Don't have an account? <Text as="span" fontWeight="bold" color="indigo.300" _hover={{ textDecoration: 'underline' }}>Sign up</Text>
                    </Text>
                </VStack>
            </VStack>
        </Flex>
    )
}

export default Login;