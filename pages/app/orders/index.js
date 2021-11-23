import { Button } from '@chakra-ui/button'
import moment from 'moment'
import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import {
	Badge,
	Box,
	Divider,
	Flex,
	Grid,
	HStack,
	Text,
} from '@chakra-ui/layout'
import { Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/stat'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import Link from 'next/link'
import { AppPage } from '../../../components/common/AppPage'
import { ClipboardListIcon } from '../../../components/common/icons/ClipboardListIcon'
import { CogIcon } from '../../../components/common/icons/CogIcon'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { OrderTypeEnum } from '../../../context/NewOrder'
import { TabsProvider, useTabs } from '../../../context/Tabs'
import { useOrderItems } from '../../../hooks/order/useOrderItems'
import { getTotal, getTotalQty } from '../../../utils/calculateTotal'
import { formatPrice } from '../../../utils/formatPrice'

function Orders() {
	return (
		<AppPage displayHeader={false}>
			<Flex flex='1' flexDir='column' w='full' overflow='hidden'>
				<Flex alignItems='center' justifyContent='space-between' p='4' pb='2'>
					<Flex alignItems='center'>
						<ClipboardListIcon mr='2' flex='1' w='6' h='6' />
						<Text fontSize='xl'>Pesanan</Text>
					</Flex>
					<CogIcon w='6' h='6' />
				</Flex>
				<TabsProvider>
					<OrderTabs />
				</TabsProvider>
				<Box
					py='4'
					borderTop='1px solid'
					borderTopColor='gray.700'
					overflowX='auto'
				>
					<HStack w='max-content' px='4' overflowX='auto'>
						<Link passHref href='/app/orders/new'>
							<Button as={'a'} colorScheme='teal' size='sm'>
								+ Tambah Pesanan
							</Button>
						</Link>
					</HStack>
				</Box>
			</Flex>
		</AppPage>
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
			p='2'
			px='4'
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
					<Tab flexShrink='0'>Today</Tab>
					<Tab flexShrink='0'>This Week</Tab>
					<Tab flexShrink='0'>This Month</Tab>
					<Tab flexShrink='0'>All</Tab>
				</>
			)}
		</TabList>
	)
}

const OrderPanels = () => {
	const orderPanels = [
		{
			type: 'today',
			label: 'Hari Ini',
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
	const panelTotal = items.reduce((prev, curr) => {
		return prev + getTotal(curr.items)
	}, 0)

	return (
		<Box w='100%' maxW='container.md' mx='auto'>
			<Text mb='2' fontSize='lg' fontWeight='bold'>
				Statistik {label}
			</Text>
			<StatGroup
				mb='2'
				border='1px solid'
				borderColor='gray.700'
				p='4'
				rounded='xl'
			>
				<Stat variant='outline' mr='6'>
					<StatLabel>Total pemasukan</StatLabel>
					<StatNumber>{formatPrice(panelTotal)}</StatNumber>
				</Stat>
				<Stat mr='6' minW='max-content'>
					<StatLabel>Total Pesanan</StatLabel>
					<StatNumber>45</StatNumber>
				</Stat>
			</StatGroup>
			<StatGroup
				mb='2'
				border='1px solid'
				borderColor='gray.700'
				p='4'
				rounded='xl'
			>
				<Stat mr='6' minW='max-content'>
					<StatLabel>Bawa Pulang</StatLabel>
					<StatNumber>
						{items.filter((i) => i.type === OrderTypeEnum.TAKE_AWAY).length}
					</StatNumber>
				</Stat>
				<Stat mr='6' minW='max-content'>
					<StatLabel>Makan Di Tempat</StatLabel>
					<StatNumber>
						{items.filter((i) => i.type === OrderTypeEnum.DINE_IN).length}
					</StatNumber>
				</Stat>
			</StatGroup>
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

const OrderCard = ({ order }) => {
	return (
		<Flex
			flexDir='column'
			pos='relative'
			borderRadius='xl'
			border='1px solid'
			borderColor='gray.700'
			overflow='hidden'
		>
			<Box
				p='2'
				bg='gray.900'
				borderBottom='1px solid'
				borderBottomColor='gray.700'
				w='100%'
			>
				<HStack mb='1' w='full' alignItems='center'>
					<Text fontSize='lg' fontWeight='bold'>
						Order #{order.no}
					</Text>
					<Divider orientation='vertical' h='6' mx='2' />
					<Text fontSize='sm' color='gray.300'>
						Meja #{order.table}
					</Text>
					<Divider orientation='vertical' h='6' mx='2' />
					<Text fontSize='sm' color='gray.300'>
						{order.customer}
					</Text>
				</HStack>
				<HStack overflowX='auto' pb='2'>
					{order.status === 'on_progress' ? (
						<Badge colorScheme='yellow'>Dalam Proses</Badge>
					) : order.status === 'completed' ? (
						<Badge colorScheme='green'>Selesai</Badge>
					) : (
						<Badge colorScheme='red'>Dibatalkan</Badge>
					)}
					{order.isPaid ? (
						<Badge colorScheme='green'>Sudah di Bayar</Badge>
					) : (
						<Badge colorScheme='yellow'>Belum bayar</Badge>
					)}
					{order.type === 'DINE_IN' ? (
						<Badge colorScheme='blue'>Makan di tempat</Badge>
					) : (
						<Badge colorScheme='blue'>Bawa pulang</Badge>
					)}
				</HStack>
			</Box>
			<Flex p='2' flexDir='column' bg='gray.900' w='100%'>
				<Flex justifyContent='space-between'>
					<Text mb='2' fontSize='lg' fontWeight='bold'>
						Total Bayar : {formatPrice(getTotal(order.items))}
					</Text>
					<Text textAlign='right' mb='2' fontSize='lg' fontWeight='bold'>
						Jumlah Item : {getTotalQty(order.items)}
					</Text>
				</Flex>
				<Button mb='2' size='xs'>Lihat Detail</Button>
				<Text textAlign='right' fontSize='10px' color='gray.400'>
					{moment(order.createdAt.toDate()).calendar()}
				</Text>
			</Flex>
		</Flex>
	)
}

export default withProtectedRoute(Orders)
