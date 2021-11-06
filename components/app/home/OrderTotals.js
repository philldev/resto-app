import { Button } from '@chakra-ui/button'
import { Box, Divider, Text } from '@chakra-ui/layout'

export default function OrderTotals() {
	return (
		<Box p='4'>
			<Divider my='4' />
			<Box mb='8'>
				<Box d='flex' justifyContent='space-between'>
					<Text>Discount</Text> <Text>$0</Text>
				</Box>
				<Box d='flex' justifyContent='space-between'>
					<Text>Sub Total</Text> <Text>$0</Text>
				</Box>
			</Box>
			<Button w='full'>Continue Payment</Button>
		</Box>
	)
}
