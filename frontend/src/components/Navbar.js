import { Flex, Text, VStack, HStack, Avatar, Box, IconButton } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  IoHomeOutline, IoHome,
  IoSearchOutline, IoSearch,
  IoAddCircleOutline, IoAddCircle,
  IoPersonOutline, IoPerson,
  IoSettingsOutline, IoSettings,
  IoLogOutOutline
} from "react-icons/io5";
import { logout } from "../api/endpoints";

const Navbar = () => {
  const nav = useNavigate();
  const location = useLocation();

  const handleFunction = (route) => {
    nav(`/${route}`);
  };

  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const localUsername = userData.username || 'user';
  const localDisplayName = userData.name || localUsername;

  const handleNavigateUser = () => {
    if (localUsername) {
      nav(`/${localUsername}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error('Logout API failed:', e);
    } finally {
      localStorage.removeItem('userData');
      nav('/login');
    }
  };

  const isActive = (path) => {
    if (path === '') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(`/${path}`);
  };

  // Sidebar Menu Items for Desktop
  const menuItems = [
    { label: "Home", path: "", activeIcon: <IoHome size="24px" color="#EC4899" />, inactiveIcon: <IoHomeOutline size="24px" /> },
    { label: "Search", path: "search", activeIcon: <IoSearch size="24px" color="#6366F1" />, inactiveIcon: <IoSearchOutline size="24px" /> },
    { label: "Create Post", path: "create/post", activeIcon: <IoAddCircle size="24px" color="#A855F7" />, inactiveIcon: <IoAddCircleOutline size="24px" /> },
    { label: "Profile", path: localUsername, activeIcon: <IoPerson size="24px" color="#6366F1" />, inactiveIcon: <IoPersonOutline size="24px" /> },
    { label: "Settings", path: "settings", activeIcon: <IoSettings size="24px" color="#A855F7" />, inactiveIcon: <IoSettingsOutline size="24px" /> }
  ];

  return (
    <>
      {/* DESKTOP LEFT SIDEBAR */}
      <Box
        display={{ base: "none", md: "flex" }}
        flexDirection="column"
        w={{ md: "240px", lg: "280px" }}
        h="100vh"
        position="sticky"
        top="0"
        borderRight="1px solid rgba(255, 255, 255, 0.08)"
        bg="rgba(8, 11, 17, 0.5)"
        backdropFilter="blur(20px)"
        p="6"
        justifyContent="space-between"
        zIndex="1000"
      >
        <VStack align="stretch" spacing="8">
          {/* Logo */}
          <Text 
            fontSize="26px" 
            fontWeight="900" 
            bgGradient="linear(to-r, #6366F1, #A855F7, #EC4899)"
            bgClip="text"
            cursor="pointer"
            onClick={() => handleFunction('')}
            letterSpacing="-1px"
            px="3"
          >
            socialhub
          </Text>

          {/* Menu Links */}
          <VStack align="stretch" spacing="2">
            {menuItems.map((item, idx) => {
              const active = isActive(item.path);
              return (
                <HStack
                  key={idx}
                  onClick={() => {
                    if (item.path === localUsername) {
                      handleNavigateUser();
                    } else {
                      handleFunction(item.path);
                    }
                  }}
                  cursor="pointer"
                  py="3"
                  px="4"
                  borderRadius="14px"
                  spacing="4"
                  transition="all 0.25s ease"
                  bg={active ? "rgba(255, 255, 255, 0.04)" : "transparent"}
                  border={active ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid transparent"}
                  color={active ? "white" : "gray.400"}
                  _hover={{ 
                    bg: "rgba(255, 255, 255, 0.06)", 
                    color: "white",
                    transform: "translateX(4px)" 
                  }}
                >
                  {active ? item.activeIcon : item.inactiveIcon}
                  <Text fontSize="15px" fontWeight={active ? "700" : "600"}>
                    {item.label}
                  </Text>
                </HStack>
              );
            })}
          </VStack>
        </VStack>

        {/* Profile Card / Logout */}
        <HStack 
          p="3" 
          bg="rgba(255, 255, 255, 0.02)" 
          borderRadius="16px" 
          border="1px solid rgba(255, 255, 255, 0.04)"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack spacing="3" cursor="pointer" onClick={handleNavigateUser}>
            <Avatar 
              name={localDisplayName} 
              size="sm" 
              bgGradient="linear(to-tr, #6366F1, #A855F7)" 
              color="white"
              fontWeight="bold"
            />
            <VStack align="start" spacing="0" maxW="120px">
              <Text fontSize="14px" fontWeight="700" color="white" isTruncated w="100%">
                {localDisplayName}
              </Text>
              <Text fontSize="12px" color="gray.500" isTruncated w="100%">
                @{localUsername}
              </Text>
            </VStack>
          </HStack>
          <IconButton
            icon={<IoLogOutOutline size="22px" />}
            variant="ghost"
            color="gray.400"
            borderRadius="12px"
            _hover={{ bg: "rgba(239, 68, 68, 0.1)", color: "red.400" }}
            onClick={handleLogout}
            aria-label="Logout"
            size="sm"
          />
        </HStack>
      </Box>

      {/* MOBILE TOP HEADER */}
      <Flex
        display={{ base: "flex", md: "none" }}
        w="100%"
        h="60px"
        px="4"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid rgba(255, 255, 255, 0.08)"
        bg="rgba(8, 11, 17, 0.8)"
        backdropFilter="blur(12px)"
        position="sticky"
        top="0"
        zIndex="1000"
      >
        <Text 
          fontSize="22px" 
          fontWeight="900" 
          bgGradient="linear(to-r, #6366F1, #A855F7, #EC4899)"
          bgClip="text"
          cursor="pointer"
          onClick={() => handleFunction('')}
          letterSpacing="-0.5px"
        >
          socialhub
        </Text>
        <IconButton
          icon={<IoLogOutOutline size="22px" />}
          variant="ghost"
          color="gray.400"
          _hover={{ bg: "rgba(239, 68, 68, 0.1)", color: "red.400" }}
          onClick={handleLogout}
          aria-label="Logout"
          size="sm"
        />
      </Flex>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <Flex
        display={{ base: "flex", md: "none" }}
        w="100%"
        h="65px"
        position="fixed"
        bottom="0"
        left="0"
        zIndex="1000"
        borderTop="1px solid rgba(255, 255, 255, 0.08)"
        bg="rgba(8, 11, 17, 0.8)"
        backdropFilter="blur(12px)"
        alignItems="center"
        justifyContent="space-around"
        pb="safe-bottom"
      >
        {menuItems.map((item, idx) => {
          const active = isActive(item.path);
          
          // Style "Create Post" differently on mobile
          if (item.label === "Create Post") {
            return (
              <Box
                key={idx}
                onClick={() => handleFunction(item.path)}
                cursor="pointer"
                p="2"
                borderRadius="50%"
                bgGradient="linear(to-tr, #6366F1, #EC4899)"
                color="white"
                transition="all 0.2s"
                _active={{ transform: "scale(0.9)" }}
                boxShadow="0 4px 14px rgba(99, 102, 241, 0.4)"
              >
                <IoAddCircle size="28px" color="white" />
              </Box>
            );
          }

          return (
            <Flex
              key={idx}
              onClick={() => {
                if (item.path === localUsername) {
                  handleNavigateUser();
                } else {
                  handleFunction(item.path);
                }
              }}
              cursor="pointer"
              direction="column"
              align="center"
              justify="center"
              color={active ? "white" : "gray.500"}
              w="12"
              h="12"
              transition="all 0.2s"
            >
              {active ? item.activeIcon : item.inactiveIcon}
              {active && (
                <Box 
                  w="4px" 
                  h="4px" 
                  bg={idx === 0 ? "#EC4899" : idx === 1 ? "#6366F1" : idx === 3 ? "#6366F1" : "#A855F7"} 
                  borderRadius="50%" 
                  mt="1px" 
                />
              )}
            </Flex>
          );
        })}
      </Flex>
    </>
  );
};

export default Navbar;

