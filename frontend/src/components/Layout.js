import { Box, Flex } from "@chakra-ui/react"
import Navbar from "./Navbar"
import { useLocation } from "react-router-dom"

const Layout = ({ children }) => {
  const location = useLocation();
  const userData = localStorage.getItem('userData');
  const showNavigation = location.pathname !== '/login' && location.pathname !== '/register' && userData;

  return (
    <Flex 
      w='100vw' 
      minH='100vh' 
      bg='radial-gradient(circle at 50% -20%, #1a2236 0%, #080b11 100%)' 
      flexDirection={{ base: 'column', md: 'row' }}
      overflowX='hidden'
    >
      {showNavigation && <Navbar />}
      
      <Box 
        flex={1} 
        w='100%' 
        maxW={showNavigation ? { base: '100%', md: 'calc(100% - 240px)', lg: 'calc(100% - 280px)' } : '1200px'}
        mx="auto"
        px={{ base: 4, md: 8 }}
        pt={showNavigation ? { base: '20px', md: '40px' } : '40px'}
        pb={showNavigation ? { base: '90px', md: '40px' } : '40px'}
      >
        {children}
      </Box>
    </Flex>
  )
}

export default Layout