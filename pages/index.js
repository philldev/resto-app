import { Button } from '@chakra-ui/button'
import { Box, Flex, Text } from '@chakra-ui/layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function HomePage() {
	return (
		<>
			<Head>
				<title>Relio - POST App</title>
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
					<Flex flexDir='column' alignItems='center' as='header' pt='12' mb='4'>
						<Box mb='2'>
							<Image width='100px' height='100px' alt='logo' src='/logo.png' />
						</Box>
						<Text textAlign='center' px='8' maxW='md'>
							<strong>relio</strong> adalah aplikasi POS untuk restoran, cafe, dan penjualan lainnya!
						</Text>
					</Flex>
					<Flex justifyContent='center'>
						<Link href='/signup' passHref>
							<Button>Coba Sekarang!</Button>
						</Link>
					</Flex>
				</Flex>
				<Footer />
			</Box>
		</>
	)
}
