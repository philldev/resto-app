import { Grid } from '@chakra-ui/layout'
import * as React from 'react'
import MainTopbar from '../../../components/app/MainTopbar'
import MainWrapper from '../../../components/app/MainWrapper'
import Sidebar from '../../../components/app/Sidebar'
import Page from '../../../components/common/Page'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'

function Menu() {
	return (
		<Page>
			<Grid
				gridTemplateColumns='250px 1fr'
				w='100vw'
				h='100vh'
				overflow='hidden'
			>
				<Sidebar />
				<MainWrapper>
					<MainTopbar />
				</MainWrapper>
			</Grid>
		</Page>
	)
}

export default withProtectedRoute(Menu)