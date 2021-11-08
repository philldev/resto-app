import { Button } from '@chakra-ui/button'
import { Box, Grid, Heading, VStack } from '@chakra-ui/layout'
import * as React from 'react'
import Stats from '../../components/app/home/Stats'
import TodayOrders from '../../components/app/home/TodayOrders'
import MainTopbar from '../../components/app/MainTopbar'
import MainWrapper from '../../components/app/MainWrapper'
import Sidebar from '../../components/app/Sidebar'
import Page from '../../components/common/Page'
import withProtectedRoute from '../../components/hoc/withProtectedRoute'
import NextLink from 'next/link'

function App() {
	return (
		<Page>
			<Grid
				gridTemplateColumns='250px 1fr'
				w='100vw'
				h='100vh'
				overflow='hidden'
			>
				<Sidebar />
				<MainWrapper alignItems='center' d='flex' flexDir='column'>
					<MainTopbar />
					<Grid
						templateColumns={'1fr 20%'}
						gap='4'
						maxW='container.lg'
						w='100%'
						p='4'
					>
						<Box flex='1 0'>
							<Stats />
							<TodayOrders />
						</Box>
						<Box>
							<Heading fontSize='2xl' mb='3'>
								Shortcuts
							</Heading>
							<VStack>
								<NextLink href='/app/orders/create-order' passHref>
									<Button as='a' w='full'>
										Add Order +
									</Button>
								</NextLink>
								<Button w='full'>Add Product +</Button>
							</VStack>
						</Box>
					</Grid>
				</MainWrapper>
			</Grid>
		</Page>
	)
}

export default withProtectedRoute(App)
