import { ReactNode, useContext } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import{Link as Routerlink, useNavigate} from "react-router-dom"
import { AuthContext } from '../context/AuthContext';

export default function Navber() {
  const { colorMode, toggleColorMode } = useColorMode();

  const{logout,isAuth}=useContext(AuthContext)
  const navigate=useNavigate()
  const handleClick=()=>{
    console.log("click")
    if(isAuth){
        
        logout()
       
    }
    else{
        navigate("/login")   
    }
}


  return (
    <>
      <Box bgGradient='linear(to-r, green.200, pink.500)' px={4}>
        <Flex h={16}  alignItems={'center'} justifyContent={'space-between'}>
          
          <HStack
              as={'nav'}
              spacing={14}
              display={{ base: 'none', md: 'flex' }}>
             <Box px={2}
              py={1}
              fontWeight={"bold"}
              fontSize={'18px'}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('red.200', 'red.300'),
              }}> <Routerlink to="/login">Login</Routerlink></Box>
               {/* second */}
             <Box px={2}
              py={1}
              fontWeight={"bold"}
              fontSize={'18px'}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('yellow.200', 'yellow.300'),
              }}><Routerlink to="/signup">Signup</Routerlink></Box>
              <Box px={2}
              py={1}
              fontWeight={"bold"}
              fontSize={'18px'}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('red.200', 'red.300'),
              }}> <Routerlink to="/">Home</Routerlink></Box>
            </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  {/* <Center>
                    <p>Username</p>
                  </Center>
                  <br /> */}
                  <MenuDivider />
                  <MenuItem onClick={handleClick}>{isAuth?"Logut":"Login"}</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}