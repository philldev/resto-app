import { Button } from '@chakra-ui/button'
import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { Divider } from '@chakra-ui/react'
import OrderItem from './OrderItem'

export default function OrderBar() {
	return (
		<Box p='4'>
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
			<VStack>
				<OrderItem />
			</VStack>
		</Box>
	)
}
