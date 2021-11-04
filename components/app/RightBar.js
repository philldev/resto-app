import { Box } from '@chakra-ui/layout'

export default function RightBar({ children, ...rest }) {
	return (
		<Box
			pos='fixed'
			right='0'
			top='0'
			height='100vh'
			maxW='30vw'
			w='full'
			minW='96'
			borderLeftWidth='1px'
			borderLeftColor='gray.700'
			borderLeftStyle='solid'
			{...rest}
		>
			{children}
		</Box>
	)
}
