import { Heading, VStack, Text, Flex, Button, Spinner, Textarea, Avatar, Box, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { get_posts, create_post } from "../api/endpoints";
import Post from "../components/post";

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextPage, setNextPage] = useState(1)
    
    // Quick Post Creator state
    const [quickPostText, setQuickPostText] = useState('')
    const [posting, setPosting] = useState(false)

    // Fetch user info for composer avatar fallback
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const localUsername = userData.username || 'User';
    const localDisplayName = userData.first_name || localUsername;

    const fetchData = async () => {
        const data = await get_posts(nextPage)
        setPosts([...posts, ...data.results])
        setNextPage(data.next ? nextPage+1 : null)
    }

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await fetchData()
            } catch {
                alert('error getting posts')
            } finally {
                setLoading(false)
            }
        }
        loadInitialData()
    }, [])

    const loadMorePosts = () => {
        if (nextPage) {
            fetchData()
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
                first_name: userData.first_name || '',
                last_name: userData.last_name || ''
            };
            setPosts([formattedNewPost, ...posts]);
            setQuickPostText('');
        } catch {
            alert('Error creating post');
        } finally {
            setPosting(false);
        }
    }

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
                                      first_name={post.first_name}
                                      last_name={post.last_name}
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