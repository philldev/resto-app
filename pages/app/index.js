import { Box, Grid, Text } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import * as React from 'react'
import OrderBar from '../../components/app/home/OrderBar'
import ProductList from '../../components/app/home/ProductList'
import MainTopbar from '../../components/app/MainTopbar'
import MainWrapper from '../../components/app/MainWrapper'
import RightBar from '../../components/app/RightBar'
import Sidebar from '../../components/app/Sidebar'
import Page from '../../components/common/Page'
import withProtectedRoute from '../../components/hoc/withProtectedRoute'

function App() {
	return (
		<Page>
			<Grid
				gridTemplateColumns='250px 1fr .5fr'
				w='100vw'
				h='100vh'
				overflow='hidden'
			>
				<Sidebar />
				<MainWrapper d='flex' flexDir='column'>
					<MainTopbar />
					<Tabs overflowY='auto'>
						<TabList>
							<Tab _focus={{ boxShadow: 'none' }}>One</Tab>
							<Tab _focus={{ boxShadow: 'none' }}>Two</Tab>
							<Tab _focus={{ boxShadow: 'none' }}>Three</Tab>
						</TabList>
						<TabPanels h='calc(100% - 41.62px)' overflowY='auto'>
							<TabPanel>
								<ProductList />
							</TabPanel>
							<TabPanel>
								<ProductList />
							</TabPanel>
							<TabPanel>
								<ProductList />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</MainWrapper>
				<RightBar>
					<OrderBar />
				</RightBar>
			</Grid>
		</Page>
	)
}

export default withProtectedRoute(App)
