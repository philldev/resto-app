import { Box } from '@chakra-ui/layout'

export default function MainWrapper({ children }) {
	return (
		<Box pl='80' h='full' flex='1' flexShrink='0'>
			{children}
		</Box>
	)
}
