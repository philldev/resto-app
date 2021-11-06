import { Box, Flex, Grid, Text } from '@chakra-ui/layout'
import ProductItem from './ProductItem'

export default function ProductList() {
	return (
		<Flex flexDir='column' overflowY='auto'>
			<Text fontSize='xl'>Choose Dishes</Text>
			<Grid gridTemplateColumns='repeat(3, 1fr)' gap='8'>
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
			</Grid>
		</Flex>
	)
}
