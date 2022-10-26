import React from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormHelperText
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { Link as Routerlink, Navigate, useNavigate } from 'react-router-dom';
  import referralCodes from 'referral-codes'
  import { useToast } from '@chakra-ui/react'
  
    
const Signup = () => {
  const toast = useToast()
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate()
    const[data,setData]=useState({
        email:"",
        referral:"",
        password:"",
        name:"",
        mobile:"",
    })
  
  // register user
    const handleSubmit = () => {
         let ans=validation()
         if(ans){
      const reffer=referralCodes.generate({
        length: 8,
        count:1
      });
       console.log(reffer[0])
        let obj={
            email:data.email,
            password:data.password,
            Username:data.name,
            Referral:data.referral,
            Points:0,
            Refferalcode:reffer[0],
            Mobile:data.mobile
            
        }
        // console.log(obj)
       
        fetch(`https://refferaldata.herokuapp.com/user/signin`,{
          method:"POST",
          headers:{
            "Accepted":"application/json",
             "Content-Type":"application/json"
          },
          body:JSON.stringify(obj)
        })
       
        // .then((res)=>console.log(res))
      .then(()=> {
          if(data.referral!=="")
        {
          fetch(`https://refferaldata.herokuapp.com/user/points`,{
            method:"PATCH",
            headers:{
              "Accepted":"application/json",
              "Content-Type":"application/json",
              "refid":`${data.referral}`,
              "poinid":5
            }
          })
          .then(()=>{
            let refferal=reffer[0]
            fetch(`https://refferaldata.herokuapp.com/user/points`,{
             method:"PATCH",
             headers:{
               "Accepted":"application/json",
               "Content-Type":"application/json",
               "refid":`${refferal}`,
               "poinid":10
             }
           })
          })
         }})
         .then(()=>{
          toast({
            title: 'Account created',
            description: "Thankyou for signup",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          navigate("/login")
         })
         
         
        
      }

    }
    // form validation
    const validation=()=>{
      let name=data.name;
      let email=data.email;
      let password=data.password;
      let mobile=data.mobile;
      if(name==""||email==""||password==""||mobile=="")
      { 
        toast({
          title: 'Details',
          description: "Please fill all the details which is madotory",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return false
      }
      return true
    }

    // input chage
    const handleChange = (e) => {
        // console.log(e)
        const{name,value}=e.target;
        console.log(name,value)
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));


    }
  return (
 
   
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            
            <Stack align={'center'} >
            <marquee direction="right"  behavior="alternate" > 
                <Heading fontSize={'3xl'}  >
               
                  <Text bgClip='text' fontSize='6xl' fontWeight='extrabold' bgGradient='linear(to-l, #7928CA, #FF0080)'>Sign up</Text>
                  
                </Heading>
                </marquee>
                
              </Stack>
              
              <Box
                 marginTop={"5px"}
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" value={data.name} onChange={(e)=>handleChange(e)} name="name" />
                        <FormHelperText>Please Enter your Username</FormHelperText>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="Refferal">
                        <FormLabel>Refferal</FormLabel>
                        <Input type="text" value={data.referral} onChange={(e)=>handleChange(e)} name="referral" />
                        <FormHelperText>Please if you have Refferal code</FormHelperText>
                      </FormControl>
                    </Box>
                    
                  </HStack>
                  <FormControl id="mobilr" isRequired>
                    <FormLabel>Mobile number </FormLabel>
                    <Input type="number" value={data.mobile} onChange={(e)=>handleChange(e)} name="mobile" />
                    <FormHelperText>Please enter you Mobile number</FormHelperText>
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email </FormLabel>
                    <Input type="email" value={data.email} onChange={(e)=>handleChange(e)} name="email" />
                    <FormHelperText>please enter you Email</FormHelperText>
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input type={showPassword ? 'text' : 'password'} value={data.password} onChange={(e)=>handleChange(e)} name="password" />
                      
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
                    <FormHelperText>Please choose a Strong Password</FormHelperText>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      onClick={handleSubmit}
                      >
                      Sign up
                    </Button>
                  </Stack>
                  <Flex pt={6} justify={'center'}>
                    <Text align={'center'}>
                      Already a user? 
                    </Text>
                    <Text align={'center'} color="blue.500"> <Routerlink to="/login"color={'blue.400'}>Login</Routerlink></Text>
                  </Flex>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        );
      }




 
export default Signup