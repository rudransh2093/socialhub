import { Box, VStack } from "@chakra-ui/react"
import Navbar from "./Navbar"
const Layout = ({children}) => {
  return (
    <VStack w='100%' minH='100vh' bg='radial-gradient(circle at 50% -20%, #1a2236 0%, #080b11 100%)' spacing={0} overflowX='hidden'>
        <Navbar/>
        <Box w='100%' maxW='1200px' px={{ base: 4, md: 8 }}>
            {children}
        </Box>
    </VStack>
  )
}

export default Layout