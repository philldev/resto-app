import { extendTheme } from '@chakra-ui/react'

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
				color :'#fff'
			},
		},
		Tab: {
			baseStyle: { _focus: { boxShadow: 'none' }, _active : { boxShadow: 'none' } },
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
			'*:focus' : {
				boxShadow: 'none !important'
			}
		}),
	},
})
