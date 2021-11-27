import { Box, Flex, Grid, Text } from '@chakra-ui/layout'
import Image from 'next/image'
import { Tooltip } from '@chakra-ui/tooltip'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ClipboardListIcon } from './icons/ClipboardListIcon'
import { DashboardIcon } from './icons/DashboarIcon'
import { HomeIcon } from './icons/HomeIcon'
import { MenuIcon } from './icons/MenuIcon'
import { TransactionsIcon } from './icons/TransactionIcon'
import Page from './Page'

export const AppPage = ({ children }) => {
	return (
		<Page>
			<Flex
				bg='gray.900'
				flexDir={{ base: 'column', md: 'row-reverse' }}
				h='100vh'
				w='100vw'
			>
				<Flex flex='1 0' overflow='hidden'>
					{children}
				</Flex>
				<Flex
					bg='gray.800'
					alignItems='center'
					borderTop={{ base: '1px solid', md: 'none' }}
					borderTopColor={{ base: 'gray.700', md: 'none' }}
					borderRight={{
						base: 'none',
					}}
					flexDir='column'
					h={{ base: '16', md: 'full' }}
				>
					<Box pt='4' display={['none', 'none', 'block']}>
						<Image width='32px' height='32px' alt='logo' src='/logo.png' />
					</Box>
					<Flex alignItems='center' flex='1' w='full'>
						<Grid
							maxW='container.md'
							mx='auto'
							
							fontSize='sm'
							w={{ base: 'full', md: '16' }}
							templateColumns={{ base: 'repeat(5,1fr)', md: '1fr' }}
						>
							<BottomNavItem href='/app' isRoot Icon={HomeIcon} label='Home' />
							<BottomNavItem href='/app/menus' Icon={MenuIcon} label='Menu' />
							<BottomNavItem
								href='/app/orders'
								Icon={ClipboardListIcon}
								label='Pesanan'
							/>
							<BottomNavItem
								href='/app/table'
								Icon={DashboardIcon}
								label='Meja'
							/>
							<BottomNavItem
								href='/app/transactions'
								Icon={TransactionsIcon}
								label='Transaksi'
							/>
						</Grid>
					</Flex>
				</Flex>
			</Flex>
		</Page>
	)
}

const BottomNavItem = ({ label, Icon, href, isRoot }) => {
	const router = useRouter()
	const isActive = isRoot
		? href === router.pathname
		: router.pathname.includes(href)
	return (
		<Tooltip
			display={{ base: 'none', md: 'block' }}
			label={label}
			placement='right'
		>
			<Box>
				<Link href={href} passHref>
					<Flex
						fontSize='xs'
						color={isActive ? 'teal.500' : undefined}
						as='button'
						flexDir='column'
						alignItems='center'
						justifyContent='center'
						h={{ base: 'auto', md: '16' }}
						w='full'
					>
						<Icon w='6' h='6' mb='1' display='block' />
						<Text as='span' d={{ base: 'inline', md: 'none' }}>
							{label}
						</Text>
					</Flex>
				</Link>
			</Box>
		</Tooltip>
	)
}
