import { Box, VStack } from '@chakra-ui/layout'
import OrderInfo from './OrderInfo'
import OrderItem from './OrderItem'
import OrderTotals from './OrderTotals'

export default function OrderBar() {
	return (
		<Box d='flex' flexDir='column' h='full' overflowY='auto'>
			<OrderInfo />
			<VStack p='4' pt='0' flex='1' overflowY='auto'>
				<OrderItem />
			</VStack>
			<OrderTotals />
		</Box>
	)
}
