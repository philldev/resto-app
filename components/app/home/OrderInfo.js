import { Button } from '@chakra-ui/button'
import { Box, Divider, HStack, Text } from '@chakra-ui/layout'

export default function OrderInfo() {
	return (
		<Box p='4' pb='0'>
			<Text fontSize='xl' mb='4' fontWeight='bold'>
				Orders #34562
			</Text>
			<HStack spacing='3' mb='4'>
				<Button colorScheme='teal'>Dine In</Button>
				<Button>To Go</Button>
				<Button>Delivery</Button>
			</HStack>
			<Box d='flex'>
				<Text mr='auto'>Item</Text>
				<Text w='40px' mr='4'>
					Qty
				</Text>
				<Text w='40px'>Price</Text>
			</Box>
			<Divider my='4' />
		</Box>
	)
}
