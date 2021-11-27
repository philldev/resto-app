import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/auth'
import { UserRestoProvider } from '../context/Resto'
import { theme } from '../styles/theme'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }) => {
	console.log(Component.title)
	return (
		<>
			{Component.title && (
				<Head>
					<title>relio | {Component.title}</title>
				</Head>
			)}
			<ChakraProvider theme={theme}>
				<AuthProvider>
					<UserRestoProvider>
						<Component {...pageProps} />
					</UserRestoProvider>
				</AuthProvider>
			</ChakraProvider>
		</>
	)
}

export default MyApp
