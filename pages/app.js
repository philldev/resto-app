import { Box, Flex, Grid } from '@chakra-ui/layout'
import { ChartPieIcon } from '../components/common/icons/ChartPieIcon'
import { ClipboardListIcon } from '../components/common/icons/ClipboardListIcon'
import { DashboardIcon } from '../components/common/icons/DashboarIcon'
import { HomeIcon } from '../components/common/icons/HomeIcon'
import { MenuIcon } from '../components/common/icons/MenuIcon'
import Page from '../components/common/Page'
import withProtectedRoute from '../components/hoc/withProtectedRoute'

function App() {
	return (
		<Page>
			<Flex flexDir='column' h='100vh' w='100vw'>
				<Flex
					alignItems='center'
					borderBottom='1px solid'
					borderBottomColor='gray.700'
					h='14'
					px='4'
				>
					<Box fontSize='xl'>Resto Name</Box>
				</Flex>
				<Flex flex='1 0' p='4'>
				</Flex>
				<Flex
					alignItems='center'
					borderTop='1px solid'
					borderTopColor='gray.700'
					h='20'
				>
					<Grid fontSize='sm' w='full' templateColumns='repeat(5,1fr)'>
						<Flex as='button' flexDir='column' alignItems='center'>
							<DashboardIcon w='6' h='6' mb='1' />
							<span>Home</span>
						</Flex>
						<Flex as='button' flexDir='column' alignItems='center'>
							<ClipboardListIcon w='6' h='6' mb='1' />
							<span>Pesanan</span>
						</Flex>
						<Flex as='button' flexDir='column' alignItems='center'>
							<MenuIcon w='6' h='6' mb='1' />
							<span>Menu</span>
						</Flex>
						<Flex as='button' flexDir='column' alignItems='center'>
							<ChartPieIcon w='6' h='6' mb='1' />
							<span>Statistik</span>
						</Flex>
						<Flex as='button' flexDir='column' alignItems='center'>
							<HomeIcon w='6' h='6' mb='1' />
							<span>Resto</span>
						</Flex>
					</Grid>
				</Flex>
			</Flex>
		</Page>
	)
}

export default withProtectedRoute(App)
