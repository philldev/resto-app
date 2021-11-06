import { Box } from '@chakra-ui/layout'

export default function RightBar({ children, ...rest }) {
	return (
		<Box
			height='100vh'
			borderLeftWidth='1px'
			borderLeftColor='gray.700'
			borderLeftStyle='solid'
			{...rest}
		>
			{children}
		</Box>
	)
}
