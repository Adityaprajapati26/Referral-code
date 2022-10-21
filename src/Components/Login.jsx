import React from 'react'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    FormHelperText,
  } from '@chakra-ui/react';
  import { Link as Routerlink, Navigate, useNavigate } from 'react-router-dom';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import {AuthContext} from "../context/AuthContext"
import { useContext } from 'react';
import { useToast } from '@chakra-ui/react'
 const Login=()=> {
  const toast = useToast()
    const [showPassword, setShowPassword] = useState(false);
 const [name,setName]=useState("")
 const[password,setPassword]=useState("")
 const {login}=useContext(AuthContext)
 const navigate=useNavigate()
const handleSubmit=()=>{
    console.log(name,password)
    let obj={
     Username:name,
      password:password
    }
    fetch(`https://refferaldata.herokuapp.com/user/login`,{
      method:"POST",
      headers:{
        "Accepted":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res)
      if(res.message=="Invalid credentials")
      {
        toast({
          title: 'Login Failed.',
          description: "Inavalid Credentials",
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      
      }
      else
      {
        console.log(res.id)
        localStorage.setItem("id",res.id)
        toast({
          title: 'Login Succesful.',
          // description: "LoginSuccesfull",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        login()
         navigate("/")

      }
    })
  
   
   
   
    
   
}


    return (
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}  >
            <marquee direction="right"  behavior="alternate" > 
                <Heading fontSize={'6xl'}  >
               
                  <Text bgClip='text' fontSize='5xl' fontWeight='extrabold'  bgGradient={[  
                    'linear(to-tr, red.600, yellow.600)', 
                    'linear(to-t, blue.500, teal.300)',
                    'linear(to-b, orange.600, purple.600)',
                        ]}>Login</Text>
                  
                </Heading>
                </marquee>
              
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>User-Name</FormLabel>
                  <Input type="text" value={name} onChange={(e)=>setName(e.target.value)}  />
                  <FormHelperText>Please Enter your User-name</FormHelperText>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  
                  <InputGroup>
                      <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }>
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText>Please Enter Password</FormHelperText>
                </FormControl>
                <Stack spacing={10}>
                  
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={handleSubmit}
                    >
                    Login
                  </Button>
                </Stack>
                <Flex pt={6} spacing={2} >
                    <Text align={'center'}>
                      Not have an Account?  
                    </Text>
                    <Text align={'center'} color="blue.500" ><Routerlink to="/signup" >Sigup</Routerlink></Text>
                  </Flex>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      );
  }
  export default Login