import { Avatar } from '@chakra-ui/avatar'
import { Box, Flex, Grid, Text } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'
import { formatPrice } from '../utils/formatPrice'

export const OrderItemList = chakra(({ orderItems, ...props }) => {
	return (
		<Grid gap='2' alignItems='stretch' {...props}>
			{orderItems.map((item, index) => (
				<Flex
					fontSize='sm'
					w='full'
					key={index}
					borderBottom='1px solid'
					py='2'
					borderBottomColor='gray.700'
				>
					<Avatar
						rounded='md'
						name={item.name}
						flexShrink='0'
						w='45px'
						h='45px'
					/>
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
		</Grid>
	)
})
