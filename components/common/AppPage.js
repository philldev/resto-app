import { Box, Flex, Grid } from '@chakra-ui/layout'
import { ChartPieIcon } from './icons/ChartPieIcon'
import { ClipboardListIcon } from './icons/ClipboardListIcon'
import { DashboardIcon } from './icons/DashboarIcon'
import { HomeIcon } from './icons/HomeIcon'
import { MenuIcon } from './icons/MenuIcon'
import Link from 'next/link'
import Page from './Page'
import { useRouter } from 'next/router'

export const AppPage = ({ children, displayHeader = true }) => {
	return (
		<Page>
			<Flex flexDir='column' h='100vh' w='100vw'>
				{displayHeader && (
					<Flex
						alignItems='center'
						borderBottom='1px solid'
						borderBottomColor='gray.700'
						h='14'
						px='4'
					>
						<Box fontSize='xl'>Resto Name</Box>
					</Flex>
				)}
				<Flex flex='1 0' p='4'>
					{children}
				</Flex>
				<Flex
					alignItems='center'
					borderTop='1px solid'
					borderTopColor='gray.700'
					h='20'
				>
					<Grid fontSize='sm' w='full' templateColumns='repeat(5,1fr)'>
						<BottomNavItem isRoot href='/app' Icon={DashboardIcon} label='Home' />
						<BottomNavItem href='/app/orders' Icon={ClipboardListIcon} label='Pesanan' />
						<BottomNavItem href='/app/menus' Icon={MenuIcon} label='Menu' />
						<BottomNavItem href='/app/stats' Icon={ChartPieIcon} label='Statistik' />
						<BottomNavItem href='/app/restaurant' Icon={HomeIcon} label='Resto' />
					</Grid>
				</Flex>
			</Flex>
		</Page>
	)
}

const BottomNavItem = ({ label, Icon, href, isRoot }) => {
	const router = useRouter()
	const isActive = isRoot ? href === router.pathname : router.pathname.includes(href)
	return (
		<Link href={href} passHref>
			<Flex color={isActive ? 'teal.500' : undefined} as='button' flexDir='column' alignItems='center'>
				<Icon w='6' h='6' mb='1' />
				<span>{label}</span>
			</Flex>
		</Link>
	)
}
