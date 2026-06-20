import { VStack, Text, HStack, Flex, Box, Image } from '@chakra-ui/react'
import React from 'react'
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { toggleLike } from '../api/endpoints';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from "../Constants/constants";

const Post = ({ id, username, description, formatted_date, like_count, liked, profile_image, first_name, last_name }) => {
  const [clientLiked, setClientLiked] = useState(liked)
  const [clientLikeCount, setClientLikeCount] = useState(like_count)
  const navigate = useNavigate();

  const handleToggleLike = async (e) => {
    e.stopPropagation();
    const data = await toggleLike(id);
    if (data.now_liked) {
        setClientLiked(true)
        setClientLikeCount(clientLikeCount+1)
    } else {
        setClientLiked(false)
        setClientLikeCount(clientLikeCount-1)
    }
  }

  const handleUserClick = (e) => {
    e.stopPropagation();
    navigate(`/${username}`);
  }

  const displayName = first_name || last_name 
    ? `${first_name || ''} ${last_name || ''}`.trim() 
    : username;

  return (
    <Flex 
      w="100%" 
      maxW="450px" 
      bg="rgba(255, 255, 255, 0.02)"
      backdropFilter="blur(20px)"
      border="1px solid rgba(255, 255, 255, 0.08)"
      borderRadius="18px" 
      p="16px"
      gap="12px"
      align="start"
      boxShadow="0 4px 20px 0 rgba(0, 0, 0, 0.15)"
      transition="all 0.2s ease"
      _hover={{
        bg: "rgba(255, 255, 255, 0.04)",
        borderColor: "rgba(255, 255, 255, 0.15)",
        boxShadow: "0 8px 30px 0 rgba(99, 102, 241, 0.15)"
      }}
    >
      {/* Left Column: Avatar */}
      <Box 
        boxSize='42px' 
        borderRadius='full' 
        overflow='hidden' 
        bg='#111625' 
        border='1px solid rgba(255,255,255,0.08)' 
        flexShrink={0} 
        cursor="pointer" 
        onClick={handleUserClick}
      >
        <Image 
          src={profile_image ? `${SERVER_URL}${profile_image}` : ''}  
          boxSize='100%' 
          objectFit='cover'
          fallback={<Box w="100%" h="100%" bg="rgba(255,255,255,0.08)" />}
        /> 
      </Box>
  
      {/* Right Column: Post content */}
      <VStack align="start" spacing="8px" w="100%">
        {/* Post Header Info */}
        <HStack spacing="6px" align="center" flexWrap="wrap">
          <Text 
            fontWeight="800" 
            fontSize="15px" 
            color="gray.100"
            cursor="pointer"
            onClick={handleUserClick}
            _hover={{ textDecoration: 'underline' }}
          >
            {displayName}
          </Text>
          <Text 
            fontSize="14px" 
            color="gray.500" 
            fontWeight="500"
            cursor="pointer"
            onClick={handleUserClick}
          >
            @{username}
          </Text>
          <Text color="gray.600" fontSize="14px">·</Text>
          <Text fontSize="13px" color="gray.500" fontWeight="500">
            {formatted_date}
          </Text>
        </HStack>
  
        {/* Post Description Body (dynamic height) */}
        <Text 
          textAlign="left" 
          fontSize="15px" 
          lineHeight="1.5" 
          color="gray.200" 
          fontWeight="400"
          w="100%"
          whiteSpace="pre-wrap"
        >
          {description}
        </Text>
  
        {/* Post Footer Action Bar */}
        <HStack 
          w="100%" 
          pt="4px"
          justifyContent="start"
          color="gray.500"
        >
          <HStack 
            spacing="8px" 
            cursor="pointer" 
            onClick={handleToggleLike}
            transition="all 0.2s"
            _hover={{ color: "#EF4444" }}
          >
            <Box 
              transition="all 0.15s ease"
              _active={{ transform: "scale(0.8)" }}
            >
              {clientLiked ? (
                <FaHeart color="#EF4444" size="17px" style={{ filter: "drop-shadow(0 0 4px rgba(239, 68, 68, 0.4))" }} />
              ) : (
                <FaRegHeart size="17px" />
              )}
            </Box>
            <Text fontWeight="600" fontSize="13px" color={clientLiked ? "red.400" : "gray.500"}>
              {clientLikeCount}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default Post;