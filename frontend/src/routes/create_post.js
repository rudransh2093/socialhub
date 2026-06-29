import { VStack, Flex, Heading, FormControl, FormLabel, Textarea, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { create_post } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [description, setDescription] = useState('')
  const nav = useNavigate()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  
  const handlePost = async () => {
    setLoading(true)
    try {   
        await create_post(description)
        toast({
            title: "Post Created",
            description: "Your post was shared successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
        })
        nav('/')
    } catch {
        toast({
            title: "Error",
            description: "Failed to create post. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
        })
    } finally {
        setLoading(false)
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
          Create Post
        </Heading>
        
        <FormControl>
          <FormLabel fontSize="14px" fontWeight="600" color="gray.300" mb="8px">
            What's on your mind?
          </FormLabel>
          <Textarea 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Write your post content here..." 
            size="md"
            rows={5}
            bg="rgba(255, 255, 255, 0.03)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="xl"
            _hover={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
            _focus={{
              borderColor: "#6366F1",
              boxShadow: "0 0 0 1px #6366F1",
              bg: "rgba(255, 255, 255, 0.06)"
            }}
          />
        </FormControl>
        
        <Button onClick={handlePost} isLoading={loading} h="48px" fontSize="16px" variant="solid" w="100%">
          Share Post
        </Button>
      </VStack>
    </Flex>
  );
};

export default CreatePost;