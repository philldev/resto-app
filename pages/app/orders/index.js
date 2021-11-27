import { Button } from '@chakra-ui/button'
import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Divider, Flex, Grid, HStack, Text } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { OrderCard } from '../../../components/OrderCard'
import { useUserResto } from '../../../context/Resto'
import { TabsProvider, useTabs } from '../../../context/Tabs'
import { useOrderItems } from '../../../hooks/order/useOrderItems'

const Orders = () => {
	return (
		<AppPage displayHeader={false}>
			<Flex flex='1' flexDir='column' w='full' overflow='hidden'>
				<Box w='full' px='4'>
					<Topbar />
					<ActionBar />
				</Box>
				<TabsProvider>
					<OrderTabs />
				</TabsProvider>
			</Flex>
		</AppPage>
	)
}

const Topbar = () => {
	const { currentResto } = useUserResto()
	return (
		<Flex
			maxW='container.md'
			w='full'
			mx='auto'
			alignItems='center'
			justifyContent='space-between'
			py='4'
			pb='2'
		>
			<Flex alignItems='center'>
				<Image width='32px' height='32px' alt='logo' src='/logo.png' />
				{/* <ClipboardListIcon mr='2' flex='1' w='6' h='6' /> */}
				<Text fontSize='lg' ml='2'>
					{currentResto.name}
				</Text>
				<Divider h='24px' orientation='vertical' mx='2' />
				<Text fontSize='lg' fontWeight='bold'>
					Pesanan
				</Text>
			</Flex>
		</Flex>
	)
}

const ActionBar = () => {
	return (
		<HStack maxW='container.md' w='full' py='2' mx='auto' spacing='6'>
			<Link passHref href='/app/orders/new'>
				<Button as={'a'} variant='outline' size='sm'>
					+ Tambah Pesanan
				</Button>
			</Link>
		</HStack>
	)
}

const OrderTabs = () => {
	const { tabIndex, handleTabsChange } = useTabs()
	return (
		<Tabs
			index={tabIndex}
			onChange={handleTabsChange}
			variant='soft-rounded'
			flex='1'
			overflow='hidden'
			isLazy
			lazyBehavior='keepMounted'
		>
			<OrderTabList />
			<OrderPanels />
		</Tabs>
	)
}

const OrderTabList = () => {
	const { isSearching, toggleIsSearching, searchQuery, handleQueryChange } =
		useTabs()
	return (
		<TabList
			alignItems='center'
			flex='0'
			overflowX='auto'
			overflowY='hidden'
			py='2'
			pos='relative'
			mx='auto'
			maxW='container.md'
			w='full'
		>
			{isSearching ? (
				<Flex w='full' pos='relative'>
					<Box
						zIndex='2'
						left='2'
						pos='absolute'
						as='button'
						w='10'
						h='10'
						onClick={() => toggleIsSearching()}
					>
						<CloseIcon />
					</Box>
					<Input
						value={searchQuery}
						onChange={handleQueryChange}
						bg='gray.900'
						placeholder='Nomor pesanan'
						type='number'
						rounded='3xl'
						pl='12'
					/>
				</Flex>
			) : (
				<>
					<Box
						w='10'
						h='10'
						flexShrink='0'
						alignItems='center'
						justifyContent='center'
						mr='2'
						d='flex'
						as='button'
						pos='relative'
						onClick={() => toggleIsSearching()}
					>
						{isSearching ? <CloseIcon /> : <SearchIcon />}
					</Box>
					<Tab flexShrink='0'>Hari Ini</Tab>
					<Tab flexShrink='0'>Minggu Ini</Tab>
					<Tab flexShrink='0'>Bulan Ini</Tab>
					<Tab flexShrink='0'>Semua</Tab>
				</>
			)}
		</TabList>
	)
}

const OrderPanels = () => {
	const orderPanels = [
		{
			type: 'today',
			label: moment().format('dddd'),
		},
		{
			type: 'this_week',
			label: 'Minggu Ini',
		},
		{
			type: 'this_month',
			label: 'Bulan Ini',
		},
		{
			type: 'all',
			label: 'Semua',
		},
	]
	return (
		<TabPanels
			bg='gray.900'
			d='flex'
			h='calc(100% - 56px)'
			flexDir='column'
			flex='1'
			overflowY='hidden'
		>
			{orderPanels.map((item, index) => (
				<TabPanel key={index} overflowY='auto'>
					<OrderPanel {...item} />
				</TabPanel>
			))}
		</TabPanels>
	)
}

const OrderPanel = ({ type, label }) => {
	const { items } = useOrderItems(type)
	return (
		<Box w='100%' maxW='container.md' mx='auto'>
			<Text mb='2' fontSize='lg' fontWeight='bold'>
				Pesanan {label}
			</Text>
			<Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap='2'>
				{items.map((i, idx) => (
					<OrderCard key={idx} order={i} />
				))}
			</Grid>
		</Box>
	)
}

export default withProtectedRoute(Orders)
