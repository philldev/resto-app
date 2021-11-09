import { Button } from '@chakra-ui/button'
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
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
					<Flex flex='1 0' flexDir='column' w='full' overflow='hidden'>
						<Flex flex='1 0' flexDir='column' overflowY='auto' rounded='md'>
							<Flex
								flexDir='column'
								flex='1'
								p='4'
								overflow='hidden'
								pb='0'
								pos='relative'
							>
								<Heading flex='0 1' fontSize='2xl' mb='3'>
									Order #333
								</Heading>
								<Tabs d='flex' flexDir='column' overflowY='auto'>
									<TabList>
										<Tab>All</Tab>
										<Tab>Makanan</Tab>
										<Tab>Minuman</Tab>
									</TabList>
									<TabPanels overflowY='auto'>
										{new Array(3).fill(0).map((item, index) => (
											<TabPanel overflowY='auto' key={index}>
												<Grid
													overflowY='auto'
													templateColumns='1fr 1fr 1fr'
													gap='3'
												>
													{new Array(100).fill(0).map((item, index) => (
														<Flex
															p='2'
															borderWidth='1px'
															borderColor='gray.700'
															rounded='md'
															key={index}
														>
															<Box
																h='24'
																bg='gray.500'
																w='24'
																flexShrink='0'
																mr='2'
																rounded='sm'
															></Box>
															<Flex
																flexDir='column'
																justifyContent='center'
																flex='1 0'
															>
																<Text fontWeight='bold'>Menu name</Text>
																<Text mb='2'>Rp 10K</Text>
																<Button w='full' variant='outline'>
																	Edit
																</Button>
															</Flex>
														</Flex>
													))}
												</Grid>
											</TabPanel>
										))}
									</TabPanels>
								</Tabs>
								<Box
									h='20'
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
					</Flex>
				</MainWrapper>
			</Grid>
		</Page>
	)
}

export default withProtectedRoute(CreateOrder)
