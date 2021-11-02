import { Flex } from '@chakra-ui/layout'
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
				alignItems='center'
				flexDir='column'
				justifyContent='center'
				pt='16'
				minH='calc(100vh - var(--chakra-space-10))'
			></Flex>
			<Footer />
		</>
	)
}
