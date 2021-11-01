import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
	config: {
		initialColorMode: 'dark',
		useSystemColorMode: false,
	},
	components: {
		Button: {
			baseStyle: { _focus: { boxShadow: 'none' } },
		},
		Input: {
			baseStyle: {
				_focus: {
					boxShadow: 'none',
					border: '1px solid',
					borderColor: 'slate.500',
				},
			},
		},
	},
	fonts: {
		heading: 'Poppins',
		body: 'Poppins',
	},
	styles: {
		global: (props) => ({
			'html, body': {
				color: props.colorMode === 'dark' ? 'white' : 'gray.600',
			},
			a: {
				color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
			},
		}),
	},
})

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
