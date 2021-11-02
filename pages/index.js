import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function HomePage() {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<Box w='full' h='100vh' bg='gray.800'>
				<Header />
				<Flex
					alignItems='center'
					flexDir='column'
					justifyContent='center'
					pt='16'
					minH='calc(100vh - var(--chakra-space-10))'
				>
					<Box as='header' pt='12' mb='8'>
						<Heading textAlign='center' mb='4'>
							Resto App
						</Heading>
						<Text textAlign='center' px='8' maxW='md'>
							Dus sunt laborum exercitation cillum sint minim qui esse consequat
							dolor cupidatat tempor esse sint. Incididunt do ea ut occaecat
							nisi nulla minim sit adipisicing commodo officia non ad.
						</Text>
					</Box>
					<Flex justifyContent='center'>
						<Link href='/signup' passHref>
							<Button as='a'>Get Started</Button>
						</Link>
					</Flex>
				</Flex>
				<Footer />
			</Box>
		</>
	)
}
