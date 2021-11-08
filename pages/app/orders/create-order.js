import { Button } from '@chakra-ui/button'
import { Box, Flex, Grid, Heading } from '@chakra-ui/layout'
import * as React from 'react'
import MainTopbar from '../../../components/app/MainTopbar'
import MainWrapper from '../../../components/app/MainWrapper'
import Sidebar from '../../../components/app/Sidebar'
import Page from '../../../components/common/Page'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'

const menusCategories = [
	{
		name: 'Makanan',
	},
	{
		name: 'Minuman',
	},
	{
		name: 'Cemilan',
	},
	{
		name: 'Makanan',
	},
	{
		name: 'Minuman',
	},
	{
		name: 'Cemilan',
	},
	{
		name: 'Makanan',
	},
]

function CreateOrder() {
	return (
		<Page>
			<Grid
				gridTemplateColumns='250px 1fr'
				w='100vw'
				h='100vh'
				overflow='hidden'
			>
				<Sidebar />
				<MainWrapper d='flex' flexDir='column' alignItems='center'>
					<MainTopbar />
					<Flex flexDir='column' flex='1' overflow='hidden' maxW='container.lg' w='100%'>
						<Flex
							flexDir='column'
							flex='1'
							p='4'
							overflow='hidden'
							pb='0'
							pos='relative'
						>
							<Heading flex='0 1' fontSize='2xl' mb='3'>
								Choose Menu
							</Heading>
							<Grid
								flex='1 0'
								gridAutoRows='max-content'
								templateColumns='repeat(3,1fr)'
								gap='2'
								overflowY='auto'
								pb='8'
							>
								{new Array(5).fill(0).map((item, index) => (
									<Box
										as='button'
										textAlign='center'
										key={index}
										p='4'
										bg='gray.700'
									>
										Makanan
									</Box>
								))}
							</Grid>
							<Box
								h='8'
								pos='absolute'
								bottom='0'
								right='4'
								left='4'
								w='full'
								zIndex='10'
								bgGradient='linear(to-b, transparent, gray.800)'
							/>
						</Flex>
						<Box p='4'>
							<Button w='full' size='lg' color='teal.300'>
								Order Detail
							</Button>
						</Box>
					</Flex>
				</MainWrapper>
			</Grid>
		</Page>
	)
}

export default withProtectedRoute(CreateOrder)
