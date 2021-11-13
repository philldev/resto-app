import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/auth'
import { UserRestoProvider } from '../context/Resto'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<UserRestoProvider>
					<Component {...pageProps} />
				</UserRestoProvider>
			</AuthProvider>
		</ChakraProvider>
	)
}

export default MyApp
