import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Box, Flex, Text } from '@chakra-ui/layout'

export default function ProductItem() {
	return (
		<Box>
			<Flex mt='36' position='relative' flexDir='column' alignItems='center' pt='24' px='4' pb='4' bg='gray.700' borderRadius='lg'>
				<Avatar name='Test' position='absolute' top='-24' w='44' h='44'  />
				<Text mb='4' textAlign='center'>Spicy seasoned seafood noodles</Text>
				<Text mb='4'>$ 2.29</Text>
				<Button>Add to order</Button>
			</Flex>
		</Box>
	)
}
