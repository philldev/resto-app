import { Box } from '@chakra-ui/layout'
import * as React from 'react'
import MainTopbar from '../../components/app/MainTopbar'
import MainWrapper from '../../components/app/MainWrapper'
import Sidebar from '../../components/app/Sidebar'
import Page from '../../components/common/Page'
import withProtectedRoute from '../../components/hoc/withProtectedRoute'

function Products() {
	return (
		<Page>
			<Box pos='relative' w='100vw' h='100vh'>
				<Sidebar />
				<MainWrapper>
					<MainTopbar />
				</MainWrapper>
			</Box>
		</Page>
	)
}

export default withProtectedRoute(Products)