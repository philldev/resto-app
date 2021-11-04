import { Button } from '@chakra-ui/button'
import { Box, HStack, Text } from '@chakra-ui/layout'

export default function OrderBar() {
	return (
		<Box p='4'>
			<Text fontSize='xl' mb='2' fontWeight='bold'>
				Orders #34562
			</Text>
			<HStack spacing='3'>
				<Button colorScheme='teal'>Dine In</Button>
				<Button>To Go</Button>
				<Button>Delivery</Button>
			</HStack>
		</Box>
	)
}
