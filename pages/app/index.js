import { Box } from '@chakra-ui/layout'
import * as React from 'react'
import OrderBar from '../../components/app/home/OrderBar'
import MainTopbar from '../../components/app/MainTopbar'
import MainWrapper from '../../components/app/MainWrapper'
import RightBar from '../../components/app/RightBar'
import Sidebar from '../../components/app/Sidebar'
import Page from '../../components/common/Page'
import withProtectedRoute from '../../components/hoc/withProtectedRoute'

function App() {
	return (
		<Page>
			<Box pos='relative' w='100vw' h='100vh'>
				<Sidebar />
				<MainWrapper pr='30vw' >
					<MainTopbar />
				</MainWrapper>
				<RightBar>
					<OrderBar />
				</RightBar>
			</Box>
		</Page>
	)
}

export default withProtectedRoute(App)
