import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';

const Home = () => {
const [data,setData]=useState([])
 const{isAuth,login}=useContext(AuthContext)
useEffect(()=>{
 const id=localStorage.getItem("id")
  console.log(id)
   fetch(`https://refferaldata.herokuapp.com/user/client`,{
    method:"GET",
    headers:{
      "Accepted":"application/json",
      "Content-Type":"application/json",
      "noteid":id

    }
   })
   .then((res)=>res.json())
   .then((res)=>{
     setData(res)})
},[])
console.log(data)
// console.log(isAuth)
return (
   <Center py={6}>
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={
              'https://avatars.dicebear.com/api/male/username.svg'
            }
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
           {data.Username}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {data.email}
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
          Refferal Code {` :: `}
            <Text href={'#'} color={'blue.400'}>
              {data.Refferalcode}
            </Text>{' '}
            
          </Text>
  
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Text>Mobile Number :- </Text>
            <Text color={"red.400"} fontWeight={"bold"}>{data.Mobile}</Text>
          </Stack>
  
          <Stack mt={8} direction={'row'} spacing={5}>
            <Flex
              flex={1}
              fontSize={'lg'}
              rounded={'full'}
              bg={"#DD53BB"}
              
              fontWeight="bold"
              justifyContent="center"
              >
            {/* <Badge borderRadius='full' px='4'  colorScheme='green'> */}
            Points:
          {/* </Badge> */}
          <Text color={"#3036DF"}>{data.Points}</Text>
              
            </Flex>
            <Box>

            </Box>
           
          </Stack>
        </Box>
      </Center>
   );
  
   
  
}

export default Home