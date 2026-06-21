import { VStack, Text, Flex, Button, Spinner, Textarea, Avatar, Box, HStack, Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_posts, create_post } from "../api/endpoints";
import Post from "../components/post";
import { useAuth } from "../contexts/useAuth";
import { 
  IoChatbubbleEllipsesOutline, 
  IoPeopleOutline, 
  IoSearchOutline, 
  IoSettingsOutline 
} from "react-icons/io5";

const Home = () => {
    const { auth, authLoading } = useAuth();
    const nav = useNavigate();

    // SWR Initialization: Pre-populate from session storage if available
    const [posts, setPosts] = useState(() => {
        const cached = sessionStorage.getItem('cached_posts');
        return cached ? JSON.parse(cached) : [];
    });
    // Skip loading spinner if we have cached posts to show
    const [loading, setLoading] = useState(() => {
        const cached = sessionStorage.getItem('cached_posts');
        return !cached;
    });
    const [nextPage, setNextPage] = useState(1)
    
    // Quick Post Creator state
    const [quickPostText, setQuickPostText] = useState('')
    const [posting, setPosting] = useState(false)

    // Fetch user info for composer avatar fallback
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const localUsername = userData.username || 'User';
    const localDisplayName = userData.name || localUsername;

    const fetchData = async (page = nextPage) => {
        const data = await get_posts(page)
        
        let updatedPosts;
        if (page === 1) {
            updatedPosts = data.results;
            sessionStorage.setItem('cached_posts', JSON.stringify(data.results));
        } else {
            updatedPosts = [...posts, ...data.results];
        }

        setPosts(updatedPosts)
        setNextPage(data.next ? page + 1 : null)
    }

    useEffect(() => {
        if (auth) {
            const loadInitialData = async () => {
                try {
                    // Always refresh the first page in the background (SWR pattern)
                    await fetchData(1)
                } catch {
                    alert('error getting posts')
                } finally {
                    setLoading(false)
                }
            }
            loadInitialData()
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

    const loadMorePosts = () => {
        if (nextPage) {
            fetchData(nextPage)
        }
    }

    const handleQuickPost = async () => {
        if (!quickPostText.trim()) return;
        setPosting(true);
        try {
            const newPost = await create_post(quickPostText);
            // Prepend new post to list with local user data details
            const formattedNewPost = {
                ...newPost,
                liked: false,
                like_count: 0,
                profile_image: userData.profile_image || null,
                name: userData.name || ''
            };
            const updatedPosts = [formattedNewPost, ...posts];
            setPosts(updatedPosts);
            // Update session cache with the new post
            sessionStorage.setItem('cached_posts', JSON.stringify(updatedPosts.slice(0, 10)));
            setQuickPostText('');
        } catch {
            alert('Error creating post');
        } finally {
            setPosting(false);
        }
    }

    // Loading State
    if (authLoading) {
        return (
            <Flex w="100%" h="80vh" justify="center" align="center" direction="column" gap="4">
                <Spinner size="xl" color="#6366F1" thickness="4px" speed="0.8s" />
                <Text fontSize="15px" fontWeight="600" color="gray.400" letterSpacing="0.5px">
                    Loading socialhub...
                </Text>
            </Flex>
        );
    }

    // Public Landing Page State (when logged out)
    if (!auth) {
        return (
            <Flex direction="column" align="center" justify="center" w="100%" py="10" color="white">
                {/* Hero Section */}
                <VStack spacing="6" textAlign="center" maxW="800px" px="4" mb="16" mt="10">
                    <Heading 
                        fontSize={{ base: "4xl", md: "6xl" }} 
                        fontWeight="900" 
                        lineHeight="1.1" 
                        letterSpacing="-1.5px"
                        bgGradient="linear(to-r, #6366F1, #A855F7, #EC4899)"
                        bgClip="text"
                    >
                        Welcome to socialhub
                    </Heading>
                    <Text fontSize={{ base: "md", md: "lg" }} color="gray.400" maxW="600px">
                        A modern, minimal space to connect with friends, share your thoughts, and keep up with what's happening.
                    </Text>
                    <HStack spacing="4" mt="4">
                        <Button 
                            size="lg" 
                            bgGradient="linear(to-r, #6366F1, #EC4899)" 
                            color="white" 
                            _hover={{ bgGradient: "linear(to-r, #5558DD, #DD3C8C)", transform: "scale(1.05)" }}
                            onClick={() => nav('/register')}
                            borderRadius="14px"
                            h="54px"
                            px="8"
                            boxShadow="0 4px 20px rgba(99, 102, 241, 0.4)"
                            transition="all 0.2s"
                        >
                            Get Started
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            borderColor="rgba(255, 255, 255, 0.15)"
                            color="white" 
                            _hover={{ bg: "rgba(255, 255, 255, 0.05)", transform: "scale(1.05)" }}
                            onClick={() => nav('/login')}
                            borderRadius="14px"
                            h="54px"
                            px="8"
                            transition="all 0.2s"
                        >
                            Log In
                        </Button>
                    </HStack>
                </VStack>

                {/* Features Section */}
                <VStack spacing="12" w="100%" maxW="900px" px="4" mb="16">
                    <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" textAlign="center">
                        Why choose socialhub?
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" w="100%">
                        {/* Feature 1 */}
                        <Box 
                            bg="rgba(255, 255, 255, 0.01)" 
                            backdropFilter="blur(20px)"
                            border="1px solid rgba(255, 255, 255, 0.06)" 
                            borderRadius="20px" 
                            p="6"
                            transition="all 0.3s"
                            _hover={{ bg: "rgba(255, 255, 255, 0.03)", transform: "translateY(-4px)", borderColor: "rgba(236, 72, 153, 0.2)" }}
                        >
                            <HStack align="start" spacing="4">
                                <Flex 
                                    w="44px" 
                                    h="44px" 
                                    borderRadius="12px" 
                                    bg="rgba(236, 72, 153, 0.1)" 
                                    align="center" 
                                    justify="center" 
                                    flexShrink={0}
                                >
                                    <IoChatbubbleEllipsesOutline size="22px" color="#EC4899" />
                                </Flex>
                                <VStack align="start" spacing="1">
                                    <Text fontSize="16px" fontWeight="700" color="white">Real-time Feed</Text>
                                    <Text fontSize="13px" color="gray.400">
                                        Post thoughts instantly and stay in sync with what matters to you on a clean, dynamic timeline.
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>

                        {/* Feature 2 */}
                        <Box 
                            bg="rgba(255, 255, 255, 0.01)" 
                            backdropFilter="blur(20px)"
                            border="1px solid rgba(255, 255, 255, 0.06)" 
                            borderRadius="20px" 
                            p="6"
                            transition="all 0.3s"
                            _hover={{ bg: "rgba(255, 255, 255, 0.03)", transform: "translateY(-4px)", borderColor: "rgba(99, 102, 241, 0.2)" }}
                        >
                            <HStack align="start" spacing="4">
                                <Flex 
                                    w="44px" 
                                    h="44px" 
                                    borderRadius="12px" 
                                    bg="rgba(99, 102, 241, 0.1)" 
                                    align="center" 
                                    justify="center" 
                                    flexShrink={0}
                                >
                                    <IoPeopleOutline size="22px" color="#6366F1" />
                                </Flex>
                                <VStack align="start" spacing="1">
                                    <Text fontSize="16px" fontWeight="700" color="white">Connect with Others</Text>
                                    <Text fontSize="13px" color="gray.400">
                                        Discover profiles, see user bios, and connect with people who share similar ideas.
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>

                        {/* Feature 3 */}
                        <Box 
                            bg="rgba(255, 255, 255, 0.01)" 
                            backdropFilter="blur(20px)"
                            border="1px solid rgba(255, 255, 255, 0.06)" 
                            borderRadius="20px" 
                            p="6"
                            transition="all 0.3s"
                            _hover={{ bg: "rgba(255, 255, 255, 0.03)", transform: "translateY(-4px)", borderColor: "rgba(168, 85, 247, 0.2)" }}
                        >
                            <HStack align="start" spacing="4">
                                <Flex 
                                    w="44px" 
                                    h="44px" 
                                    borderRadius="12px" 
                                    bg="rgba(168, 85, 247, 0.1)" 
                                    align="center" 
                                    justify="center" 
                                    flexShrink={0}
                                >
                                    <IoSearchOutline size="22px" color="#A855F7" />
                                </Flex>
                                <VStack align="start" spacing="1">
                                    <Text fontSize="16px" fontWeight="700" color="white">Instant Search</Text>
                                    <Text fontSize="13px" color="gray.400">
                                        Find posts and users in milliseconds. Stay updated with what is trending in the community.
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>

                        {/* Feature 4 */}
                        <Box 
                            bg="rgba(255, 255, 255, 0.01)" 
                            backdropFilter="blur(20px)"
                            border="1px solid rgba(255, 255, 255, 0.06)" 
                            borderRadius="20px" 
                            p="6"
                            transition="all 0.3s"
                            _hover={{ bg: "rgba(255, 255, 255, 0.03)", transform: "translateY(-4px)", borderColor: "rgba(99, 102, 241, 0.2)" }}
                        >
                            <HStack align="start" spacing="4">
                                <Flex 
                                    w="44px" 
                                    h="44px" 
                                    borderRadius="12px" 
                                    bg="rgba(99, 102, 241, 0.1)" 
                                    align="center" 
                                    justify="center" 
                                    flexShrink={0}
                                >
                                    <IoSettingsOutline size="22px" color="#6366F1" />
                                </Flex>
                                <VStack align="start" spacing="1">
                                    <Text fontSize="16px" fontWeight="700" color="white">Unified Preferences</Text>
                                    <Text fontSize="13px" color="gray.400">
                                        Manage your settings, update your name, bio, and credentials through a simple preferences portal.
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </SimpleGrid>
                </VStack>


                {/* Footer */}
                <Box w="100%" borderTop="1px solid rgba(255, 255, 255, 0.04)" py="8" textAlign="center">
                    <Text fontSize="13px" color="gray.600">
                        &copy; 2026 socialhub. Designed with &hearts; for developers.
                    </Text>
                </Box>
            </Flex>
        );
    }

    // Authenticated Timeline Feed
    return (
        <Flex w='100%' justifyContent='center' pt='10px'>
            <VStack w='100%' maxW='450px' alignItems='center' gap='20px' pb='50px'>
                {/* Twitter-style Sticky Feed Header */}
                <Flex 
                  w="100%" 
                  borderBottom="1px solid rgba(255, 255, 255, 0.08)" 
                  position="sticky" 
                  top="80px" 
                  bg="rgba(8, 11, 17, 0.9)" 
                  backdropFilter="blur(12px)" 
                  zIndex={10}
                  pt="10px"
                >
                    <Flex 
                      flex={1} 
                      justify="center" 
                      py="14px" 
                      cursor="pointer" 
                      borderBottom="3px solid #6366F1" 
                      fontWeight="800" 
                      color="gray.100" 
                      fontSize="14px"
                    >
                      For you
                    </Flex>
                    <Flex 
                      flex={1} 
                      justify="center" 
                      py="14px" 
                      cursor="pointer" 
                      color="gray.500" 
                      fontWeight="700" 
                      fontSize="14px" 
                      transition="all 0.2s"
                      _hover={{ color: 'gray.200', bg: 'rgba(255, 255, 255, 0.01)' }}
                    >
                      Following
                    </Flex>
                </Flex>

                {/* Quick Post Composer */}
                <Flex 
                  w="100%" 
                  bg="rgba(255, 255, 255, 0.02)"
                  backdropFilter="blur(20px)"
                  border="1px solid rgba(255, 255, 255, 0.08)"
                  borderRadius="18px"
                  p="16px"
                  gap="12px"
                  align="start"
                  boxShadow="0 4px 20px 0 rgba(0, 0, 0, 0.15)"
                >
                    <Avatar 
                      name={localDisplayName} 
                      size="sm" 
                      bgGradient="linear(to-tr, #6366F1, #A855F7)" 
                      color="white" 
                      fontWeight="bold" 
                      fontSize="14px"
                    />
                    <VStack align="end" flex={1} spacing="12px">
                        <Textarea 
                          value={quickPostText}
                          onChange={(e) => setQuickPostText(e.target.value)}
                          placeholder="What is happening?!" 
                          variant="unstyled"
                          resize="none"
                          minH="60px"
                          fontSize="15px"
                          color="gray.100"
                          _placeholder={{ color: "gray.500" }}
                          py="4px"
                        />
                        <HStack justify="space-between" w="100%" align="center">
                            <Box />
                            <Button 
                              size="sm" 
                              variant="solid" 
                              px="5" 
                              h="34px" 
                              fontSize="13px"
                              onClick={handleQuickPost} 
                              isLoading={posting}
                              isDisabled={!quickPostText.trim()}
                            >
                              Post
                            </Button>
                        </HStack>
                    </VStack>
                </Flex>

                {/* Feed Divider Line */}
                <Box w="100%" h="1px" bg="rgba(255, 255, 255, 0.05)" my="4px" />

                {/* Feed Posts */}
                {
                    loading ?
                        <Flex w="100%" h="200px" justify="center" align="center">
                            <Spinner size="lg" color="indigo.500" thickness="3px" />
                        </Flex>
                    :
                        posts && posts.length > 0 ?
                            posts.map((post) => {
                                return (
                                    <Post 
                                      key={post.id} 
                                      id={post.id} 
                                      username={post.username} 
                                      description={post.description} 
                                      formatted_date={post.formatted_date} 
                                      liked={post.liked} 
                                      like_count={post.like_count}
                                      profile_image={post.profile_image}
                                      name={post.name}
                                    />
                                )
                            })
                        :
                            <Flex w="100%" h="150px" justify="center" align="center" direction="column" gap={2}>
                                <Text color="gray.500" fontSize="15px">No posts available.</Text>
                            </Flex>
                }

                {
                    nextPage && !loading && (
                        <Button 
                          onClick={loadMorePosts} 
                          variant="outline" 
                          w='100%'
                          h="46px"
                          mt="10px"
                          borderColor="rgba(255, 255, 255, 0.1)"
                          _hover={{ bg: "rgba(255, 255, 255, 0.05)" }}
                        >
                          Load More
                        </Button>
                    )
                }
            </VStack>
        </Flex>
    )
}

export default Home;