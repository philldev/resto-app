import { Button } from '@chakra-ui/button'
import NextLink from 'next/link'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Heading, Link, Text, VStack } from '@chakra-ui/layout'
import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function LoginPage() {
	return (
		<>
			<Head>
				<title>Login to Resto App</title>
			</Head>
			<Header />
			<Flex
				flexDir='column'
				alignItems='center'
				justifyContent='center'
				pt='16'
				minH='calc(100vh - var(--chakra-space-10))'
			>
				<VStack maxW='sm' w='full' spacing='6'>
					<Heading>Login</Heading>
					<VStack w='full' spacing='2'>
						<Box w='full'>
							<Text mb='1' fontSize='sm'>
								Email
							</Text>
							<Input
								w='full'
								bg='gray.700'
								border='none'
								placeholder='Enter your Email'
							/>
						</Box>
						<Box w='full'>
							<Text mb='1' fontSize='sm'>
								Password
							</Text>
							<Input
								w='full'
								bg='gray.700'
								border='none'
								placeholder='Enter your Password'
								type='password'
							/>
						</Box>
					</VStack>
					<Button w='full'>Continue</Button>
				</VStack>
				<VStack mt='4'>
					<Box>
						<Text as='span'>Don&apos;t have account?{" "}</Text>
						<Link as={NextLink} href='/signup' color='teal.400' fontWeight='bold' ml='2' display='inline-block'>
							Create Account
						</Link>
					</Box>
				</VStack>
			</Flex>
			<Footer />
		</>
	)
}
