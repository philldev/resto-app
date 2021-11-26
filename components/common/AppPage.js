import { Box, Flex, Grid } from '@chakra-ui/layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ClipboardListIcon } from './icons/ClipboardListIcon'
import { DashboardIcon } from './icons/DashboarIcon'
import { HomeIcon } from './icons/HomeIcon'
import { MenuIcon } from './icons/MenuIcon'
import { MoreIcon } from './icons/MoreIcon'
import Page from './Page'

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
				<Flex flex='1 0' overflow='hidden'>
					{children}
				</Flex>
				<Flex
					alignItems='center'
					borderTop='1px solid'
					borderTopColor='gray.700'
					h='16'
				>
					<Grid maxW='container.md' mx='auto' fontSize='sm' w='full' templateColumns='repeat(5,1fr)'>
						<BottomNavItem href='/app' isRoot Icon={HomeIcon} label='Home' />
						<BottomNavItem href='/app/menus' Icon={MenuIcon} label='Menu' />
						<BottomNavItem href='/app/orders' Icon={ClipboardListIcon} label='Pesanan' />
						<BottomNavItem href='/app/table' Icon={DashboardIcon} label='Meja' />
						<BottomNavItem href='/app/more' Icon={MoreIcon} label='Lainnya' />
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
			<Flex  fontSize='xs' color={isActive ? 'teal.500' : undefined} as='button' flexDir='column' alignItems='center'>
				<Icon w='6' h='6' mb='1' />
				<span>{label}</span>
			</Flex>
		</Link>
	)
}
