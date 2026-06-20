import { VStack, Flex, Input, Button, Heading, FormLabel, FormControl, Box } from "@chakra-ui/react";
import { useState } from "react";
import { update_user,logout } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const Settings = () => {

    const storage = JSON.parse(localStorage.getItem('userData'))
    const [username, setUsername] = useState(storage ? storage.username : '')
    const [email, setEmail] = useState(storage ? storage.email : '')
    const [firstName, setFirstName] = useState(storage ? storage.first_name : '')
    const [lastName, setLastName] = useState(storage ? storage.last_name : '')
    const [bio, setBio] = useState(storage ? storage.bio : '')
    const [profileImage, setProfileImage] = useState(storage ? storage.profile_image : '')

    const nav = useNavigate();

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);
            formData.append("bio", bio);
            
            // Append profile image only if a new one is selected
            if (profileImage) {
                formData.append("profile_image", profileImage);
            }
    
            await update_user(formData);
            
            localStorage.setItem("userData", JSON.stringify({
                "username": username, "email": email,
                "first_name": firstName, "last_name": lastName, "bio": bio
            }));
    
            alert('Successfully updated!');
        } catch {
            alert('Error updating details');
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            nav('/login')
        } catch {
            alert ('error logging out')
        }
    }

    return (
        <Flex w='100%' minH='calc(100vh - 80px)' justifyContent='center' alignItems='center' py="40px">
          <VStack 
            w='95%' 
            maxW='450px' 
            alignItems='stretch' 
            gap='24px'
            bg="rgba(255, 255, 255, 0.02)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="24px"
            p={{ base: "30px 24px", sm: "40px" }}
            boxShadow="0 12px 40px rgba(0,0,0,0.3)"
          >
            <Heading 
              fontSize="28px" 
              fontWeight="800" 
              bgGradient="linear(to-r, #6366F1, #A855F7, #EC4899)" 
              bgClip="text"
              mb="10px"
            >
              Settings
            </Heading>
            
            <VStack w='100%' alignItems='stretch' gap='16px'>
              <FormControl>
                <FormLabel fontSize="14px" fontWeight="600" color="gray.300" mb="6px">Profile Picture</FormLabel>
                <Box 
                  border="1px dashed rgba(255, 255, 255, 0.15)" 
                  p="10px" 
                  borderRadius="xl"
                  bg="rgba(255, 255, 255, 0.01)"
                  _hover={{ borderColor: "indigo.400" }}
                  transition="all 0.2s"
                >
                  <input 
                    onChange={(e) => setProfileImage(e.target.files[0])} 
                    type='file' 
                    accept="image/*"
                    style={{
                      width: "100%",
                      color: "#A0AEC0",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  />
                </Box>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="14px" fontWeight="600" color="gray.300" mb="6px">Username</FormLabel>
                <Input onChange={(e) => setUsername(e.target.value)} value={username} type='text' h="44px" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="14px" fontWeight="600" color="gray.300" mb="6px">Email</FormLabel>
                <Input onChange={(e) => setEmail(e.target.value)} value={email} type='email' h="44px" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="14px" fontWeight="600" color="gray.300" mb="6px">First Name</FormLabel>
                <Input onChange={(e) => setFirstName(e.target.value)} value={firstName} type='text' h="44px" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="14px" fontWeight="600" color="gray.300" mb="6px">Last Name</FormLabel>
                <Input onChange={(e) => setLastName(e.target.value)} value={lastName} type='text' h="44px" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="14px" fontWeight="600" color="gray.300" mb="6px">Bio</FormLabel>
                <Input onChange={(e) => setBio(e.target.value)} value={bio} type='text' h="44px" />
              </FormControl>
            </VStack>
            
            <VStack w="100%" spacing="12px" mt="10px">
              <Button onClick={handleUpdate} w='100%' h="48px" variant="solid">
                Save Changes
              </Button>
              <Button onClick={handleLogout} w='100%' h="48px" variant="danger">
                Log Out
              </Button>
            </VStack>
          </VStack>
        </Flex>
    )
}

export default Settings