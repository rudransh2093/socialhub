import { Flex, Text, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

const Navbar = () => {
  const nav = useNavigate();

  const handleFunction = (route) => {
    nav(`/${route}`);
  };

  const handleNavigateUser = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const username = JSON.parse(userData)['username'];
      nav(`/${username}`);
      window.location.reload();
    }
  };

  return (
    <Flex 
      w="100vw" 
      h="80px" 
      bg="rgba(8, 11, 17, 0.8)" 
      backdropFilter="blur(12px)"
      borderBottom="1px solid rgba(255, 255, 255, 0.08)"
      justifyContent="center" 
      alignItems="center"
      position="sticky"
      top="0"
      zIndex="1000"
      transition="all 0.3s ease"
    >
      <HStack w="90%" maxW="1200px" justifyContent="space-between" color="white">
        <Text 
          fontSize="26px" 
          fontWeight="800" 
          bgGradient="linear(to-r, #6366F1, #A855F7, #EC4899)"
          bgClip="text"
          cursor="pointer"
          onClick={() => handleFunction('')}
          letterSpacing="-0.5px"
        >
          socialhub
        </Text>
        <HStack color="gray.300" spacing={6} alignItems="center">
          <Text 
            onClick={handleNavigateUser} 
            cursor="pointer" 
            transition="all 0.2s" 
            _hover={{ color: "#6366F1", transform: "scale(1.15)" }}
            display="flex"
            alignItems="center"
          >
            <IoPersonOutline size="24px" />
          </Text>
          <Text 
            onClick={() => handleFunction('create/post')} 
            cursor="pointer" 
            transition="all 0.2s" 
            _hover={{ color: "#A855F7", transform: "scale(1.15)" }}
            display="flex"
            alignItems="center"
          >
            <IoMdAddCircleOutline size="24px" />
          </Text>
          <Text 
            onClick={() => handleFunction('')} 
            cursor="pointer" 
            transition="all 0.2s" 
            _hover={{ color: "#EC4899", transform: "scale(1.15)" }}
            display="flex"
            alignItems="center"
          >
            <FaHouse size="22px" />
          </Text>
          <Text 
            onClick={() => handleFunction('search')} 
            cursor="pointer" 
            transition="all 0.2s" 
            _hover={{ color: "#6366F1", transform: "scale(1.15)" }}
            display="flex"
            alignItems="center"
          >
            <IoSearch size="24px" />
          </Text>
          <Text 
            onClick={() => handleFunction('settings')} 
            cursor="pointer" 
            transition="all 0.2s" 
            _hover={{ color: "#A855F7", transform: "scale(1.15)" }}
            display="flex"
            alignItems="center"
          >
            <IoMdSettings size="24px" />
          </Text>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Navbar;
