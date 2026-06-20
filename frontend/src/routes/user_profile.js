import { Box, Text, Flex, VStack, Heading, HStack, Image, Button, Spacer, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { get_user_profile_data, get_users_posts, toggleFollow } from "../api/endpoints";
import { SERVER_URL } from "../Constants/constants";
import Post from "../components/post";
import { useNavigate, useParams } from 'react-router-dom';

const UserProfile = () => {
    const { username } = useParams();

    return (
        <Flex w='100%' justifyContent='center' pt='40px'>
            <VStack w='100%' maxW='450px' spacing='30px'>
                <Box w='100%'>
                    <UserDetails username={username} />
                </Box>
                <Box w='100%'>
                    <UserPosts username={username} />
                </Box>
            </VStack>
        </Flex>
    )
}

const UserDetails = ({ username }) => {
    const [Loading, setLoading] = useState(true)
    const [Bio, setBio] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [followerCount, setFollowerCount] = useState(0)
    const [followingCount, setFollowingCount] = useState(0)

    const [isOurProfile, setIsOurProfile] = useState(false)
    const [following, setFollowing] = useState(false)
    const navigate = useNavigate();

    const handleToggleFollow = async () => {
        const data = await toggleFollow(username);
        if (data.now_following) {
            setFollowerCount(followerCount + 1)
            setFollowing(true)
        } else {
            setFollowerCount(followerCount - 1)
            setFollowing(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get_user_profile_data(username);
                setBio(data.bio)
                setProfileImage(data.profile_image)
                setFollowerCount(data.follower_count)
                setFollowingCount(data.following_count)
                setIsOurProfile(data.is_our_profile)
                setFollowing(data.following)
            } catch {
                console.log('error')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [username])

    return (
        <VStack 
          w='100%' 
          alignItems='stretch' 
          gap='24px'
          bg="rgba(255, 255, 255, 0.02)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255, 255, 255, 0.08)"
          borderRadius="24px"
          p="28px"
          boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.2)"
        >
            <HStack justifyContent="space-between" alignItems="center">
                <Heading fontSize='24px' fontWeight="800" color="gray.100">@{username}</Heading>
                {Loading ? (
                    <Spacer />
                ) : isOurProfile ? (
                    <Button onClick={() => navigate('/settings')} variant="outline" size="sm" h="36px" px="5">
                        Edit Profile
                    </Button>
                ) : (
                    <Button 
                      onClick={handleToggleFollow} 
                      variant={following ? "outline" : "solid"} 
                      size="sm" 
                      h="36px" 
                      px="5"
                    >
                        {following ? 'Unfollow' : 'Follow'}
                    </Button>
                )}
            </HStack>

            <HStack gap='24px' alignItems='center'>
                {/* Glowing Avatar Border */}
                <Box 
                  p='2px' 
                  bgGradient='linear(to-tr, #6366F1, #A855F7, #EC4899)' 
                  borderRadius='full' 
                  boxShadow='0 4px 15px rgba(168, 85, 247, 0.25)'
                >
                    <Box boxSize='100px' border='2px solid #080B11' bg='#111625' borderRadius='full' overflow='hidden'>
                        <Image 
                          src={Loading || !profileImage ? '' : `${SERVER_URL}${profileImage}`} 
                          boxSize='100%' 
                          objectFit='cover'
                          fallback={<Box w="100%" h="100%" bg="rgba(255,255,255,0.05)" />}
                        />
                    </Box>
                </Box>

                <HStack gap='16px' flex="1">
                    {/* Followers Tile */}
                    <VStack 
                      flex="1" 
                      p="10px" 
                      bg="rgba(255, 255, 255, 0.02)" 
                      border="1px solid rgba(255,255,255,0.06)" 
                      borderRadius="16px"
                      spacing={1}
                    >
                        <Text fontSize="12px" color="gray.500" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">Followers</Text>
                        <Text fontSize="18px" fontWeight="700" color="gray.100">{Loading ? '-' : followerCount}</Text>
                    </VStack>
                    
                    {/* Following Tile */}
                    <VStack 
                      flex="1" 
                      p="10px" 
                      bg="rgba(255, 255, 255, 0.02)" 
                      border="1px solid rgba(255,255,255,0.06)" 
                      borderRadius="16px"
                      spacing={1}
                    >
                        <Text fontSize="12px" color="gray.500" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">Following</Text>
                        <Text fontSize="18px" fontWeight="700" color="gray.100">{Loading ? '-' : followingCount}</Text>
                    </VStack>
                </HStack>
            </HStack>
            
            <Text fontSize='15px' color='gray.300' fontWeight="500" lineHeight="1.6">
                {Loading ? '-' : Bio || "No bio yet."}
            </Text>
        </VStack>
    );
}

const UserPosts = ({ username }) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await get_users_posts(username)
                setPosts(posts)
            } catch {
                alert('error getting users posts')
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [username])

    return (
        <VStack w='100%' spacing='24px' pb='50px'>
            {loading ? (
                <Flex w="100%" h="100px" justify="center" align="center">
                    <Spinner size="md" color="indigo.500" />
                </Flex>
            ) : posts && posts.length > 0 ? (
                posts.map((post) => {
                    return <Post key={post.id} id={post.id} username={post.username} description={post.description} formatted_date={post.formatted_date} liked={post.liked} like_count={post.like_count} />
                })
            ) : (
                <Flex w="100%" h="100px" justify="center" align="center" bg="rgba(255, 255, 255, 0.01)" border="1px dashed rgba(255,255,255,0.08)" borderRadius="16px">
                    <Text color="gray.500" fontSize="14px">No posts yet.</Text>
                </Flex>
            )}
        </VStack>
    )
}

export default UserProfile;

