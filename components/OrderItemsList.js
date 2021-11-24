import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import Image from 'next/image'
import { formatPrice } from '../utils/formatPrice'
import { PLACEHOLDER_MENU_IMG } from '../utils/imagePlaceholders'

export const OrderItemList = ({ orderItems }) => {
	return (
		<VStack alignItems='stretch'>
			{orderItems.map((item, index) => (
				<Flex
					fontSize='sm'
					w='full'
					key={index}
					borderBottom='1px solid'
					py='2'
					borderBottomColor='gray.700'
				>
					<Box
						flexShrink='0'
						pos='relative'
						w='45px'
						h='45px'
						rounded='lg'
						overflow='hidden'
					>
						<Image
							layout='fill'
							objectFit='cover'
							src={item.imageURL ?? PLACEHOLDER_MENU_IMG}
							alt={'Order'}
						/>
					</Box>
					<Flex
						alignItems='center'
						w='full'
						ml='2'
						justifyContent='space-between'
					>
						<Box>
							<Text>{item.name}</Text>
							<Text>{formatPrice(item.price)}</Text>
						</Box>
						<Text p='1'>x {item.qty}</Text>
					</Flex>
				</Flex>
			))}
		</VStack>
	)
}
