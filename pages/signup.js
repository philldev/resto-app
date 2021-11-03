import { Box, Flex, Link, Text, VStack } from '@chakra-ui/layout'
import Head from 'next/head'
import NextLink from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SignupForm from '../components/SignupForm'

export default function SignupPage() {
	return (
		<>
			<Head>
				<title>Signup to Resto App</title>
			</Head>
			<Header />
			<Flex
				flexDir='column'
				alignItems='center'
				justifyContent='center'
				pt='16'
				minH='calc(100vh - var(--chakra-space-10))'
			>
				<SignupForm />
				<VStack mt='4'>
					<Box>
						<Text as='span'>Have account? </Text>
						<Link
							as={NextLink}
							href='/login'
							color='teal.400'
							fontWeight='bold'
							ml='2'
							display='inline-block'
						>
							Login
						</Link>
					</Box>
				</VStack>
			</Flex>
			<Footer />
		</>
	)
}
