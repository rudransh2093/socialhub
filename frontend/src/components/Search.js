import { VStack, Flex, HStack, Input, Button, Heading, Box, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { search_users } from "../api/endpoints";
import { SERVER_URL } from "../Constants/constants";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  const handleSearch = async () => {
    const users = await search_users(search)
    setUsers(users)
  }

  return (
    <Flex w='100%' justifyContent='center' pt='40px'>
      <VStack w='100%' maxW='450px' alignItems='center' gap='24px' pb='50px'>
        <Heading 
          w='100%' 
          fontSize='28px' 
          fontWeight='800' 
          textAlign='left' 
          color='gray.100'
          letterSpacing='-0.5px'
        >
          Search Users
        </Heading>
        <HStack w='100%' gap='12px'>
          <Input 
            onChange={(e => setSearch(e.target.value))} 
            placeholder="Search username or name..." 
            h="48px"
          />
          <Button onClick={handleSearch} h="48px" px="6" variant="solid">Search</Button>
        </HStack>
        <VStack w='100%' spacing="12px" mt="10px">
          {users && users.length > 0 ? (
            users.map((user) => {
              return <UserResultItem key={user.username} username={user.username} profile_image={user.profile_image} name={user.name} />
            })
          ) : (
            search && (
              <Text color="gray.500" fontSize="14px" mt="20px">No users found.</Text>
            )
          )}
        </VStack>
      </VStack>
    </Flex>
  );    
};

const UserResultItem = ({username, profile_image, name}) => {
  const nav = useNavigate()

  const handleNav = () => {
      nav(`/${username}`)
  }

  return (
    <Flex 
      onClick={handleNav}  
      w='100%' 
      border='1px solid' 
      borderColor='rgba(255, 255, 255, 0.08)' 
      borderRadius='16px' 
      bg='rgba(255, 255, 255, 0.02)' 
      backdropFilter="blur(8px)"
      p="16px"
      justifyContent='center' 
      alignItems='center'
      cursor="pointer"
      transition="all 0.2s ease"
      _hover={{
        bg: "rgba(255, 255, 255, 0.05)",
        transform: "translateY(-2px)",
        borderColor: "rgba(255, 255, 255, 0.15)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
      }}
    >
      <HStack w='100%' gap='16px' alignItems='center'>
        <Box boxSize='60px' borderRadius='full' overflow='hidden' bg='#111625' border='2px solid rgba(255,255,255,0.08)'>
          <Image 
            src={profile_image ? `${SERVER_URL}${profile_image}` : ''}  
            boxSize='100%' 
            objectFit='cover'
            fallback={<Box w="100%" h="100%" bg="rgba(255,255,255,0.05)" />}
          /> 
        </Box>
        <VStack alignItems='start' gap='2px' flex="1">
          <Text fontWeight='700' fontSize="16px" color="gray.100">{name || username}</Text>
          <Text color='indigo.300' fontSize='14px' fontWeight="600">@{username}</Text>
        </VStack >
      </HStack>
    </Flex>
  );
}

export default Search;