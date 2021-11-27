import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { AddIcon } from '@chakra-ui/icons'
import { Box, Divider, Flex, Grid, Text, VStack } from '@chakra-ui/layout'
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
} from '@chakra-ui/modal'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { AppPage } from '../../../components/common/AppPage'
import { AppTopbar } from '../../../components/common/AppTopbar'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { More } from '../../../components/More'
import { OrderCard } from '../../../components/OrderCard'
import { useUserResto } from '../../../context/Resto'
import { TabsProvider, useTabs } from '../../../context/Tabs'
import { useOrderItems } from '../../../hooks/order/useOrderItems'
import { useIsMdSize } from '../../../hooks/windowSize'

const Orders = () => {
	return (
		<AppPage displayHeader={false}>
			<Flex flex='1' flexDir='column' w='full' overflow='hidden'>
				<Topbar />
				<TabsProvider>
					<OrderTabs />
				</TabsProvider>
				<ActionsDrawer />
			</Flex>
		</AppPage>
	)
}

Orders.title = 'Pesanan'

const Topbar = () => {
	const { currentResto } = useUserResto()
	return (
		<AppTopbar>
			<Flex w='full' alignItems='center' justifyContent='space-between'>
				<Flex alignItems='center'>
					<Image width='32px' height='32px' alt='logo' src='/logo.png' />
					<Text fontSize='lg' ml='2'>
						{currentResto.name}
					</Text>
					<Divider h='24px' orientation='vertical' mx='2' />
					<Text fontSize='lg' fontWeight='bold'>
						Pesanan
					</Text>
				</Flex>
				<More />
			</Flex>
		</AppTopbar>
	)
}

const ActionsDrawer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = React.useRef()

	return (
		<>
			<IconButton
				ref={btnRef}
				onClick={onOpen}
				position='fixed'
				bottom={{ base: '84px', md: '24px' }}
				right={{ base: '16px', md: '24px' }}
				zIndex={10}
				colorScheme='blue'
				icon={<AddIcon />}
				rounded='full'
				size='lg'
				shadow='dark-lg'
			/>

			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent bg='gray.900'>
					<DrawerCloseButton />
					<DrawerHeader>Pilih Aksi</DrawerHeader>
					<DrawerBody>
						<VStack alignItems='stretch'>
							<Link passHref href='/app/orders/new'>
								<Button as={'a'} variant='outline' size='sm'>
									+ Tambah Pesanan
								</Button>
							</Link>
						</VStack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

const OrderTabs = () => {
	const { tabIndex, handleTabsChange } = useTabs()
	const isMdSize = useIsMdSize()
	return (
		<Tabs
			size={isMdSize ? 'md' : 'sm'}
			index={tabIndex}
			onChange={handleTabsChange}
			variant='soft-rounded'
			flex='1'
			overflow='hidden'
			isLazy
			colorScheme='teal'
			p='2'
			pt='0'
			lazyBehavior='keepMounted'
		>
			<OrderTabList />
			<OrderPanels />
		</Tabs>
	)
}

const OrderTabList = () => {
	return (
		<TabList
			alignItems='center'
			flex='0'
			overflowX='auto'
			overflowY='hidden'
			px='0'
			py='4'
			pos='relative'
			maxW='container.md'
			w='full'
			mx='auto'
		>
			<Tab flexShrink='0'>Dalam Proses</Tab>
			<Tab flexShrink='0'>Selesai</Tab>
			<Tab flexShrink='0'>Di Batalkan</Tab>
		</TabList>
	)
}

const OrderPanels = () => {
	const orderPanels = [
		{
			type: 'on_progress',
		},
		{
			type: 'completed',
		},
		{
			type: 'canceled',
		},
	]
	return (
		<TabPanels
			d='flex'
			h='calc(100% - 56px)'
			flexDir='column'
			flex='1'
			overflowY='hidden'
		>
			{orderPanels.map((item, index) => (
				<TabPanel p='0' pb='20' key={index} overflowY='auto'>
					<OrderPanel {...item} />
				</TabPanel>
			))}
		</TabPanels>
	)
}

const OrderPanel = ({ type }) => {
	const { items, isLoading } = useOrderItems(type)
	const todayItems = items.filter((i) =>
		moment(i.createdAt.toDate()).isSame(moment(), 'date')
	)
	const yesterdayItems = items.filter((i) =>
		moment(i.createdAt.toDate()).isSame(moment().set('day', -1), 'date')
	)
	const thisMonthItems = items.filter((i) =>
		moment(i.createdAt.toDate()).isSame(moment(), 'month')
	)
	return (
		<Box w='100%' maxW='container.md' mx='auto'>
			{items.length === 0 && !isLoading && (
				<Text textAlign='center' color='gray.400'>
					Belum ada pesanan
				</Text>
			)}
			{items.length > 0 && (
				<VStack alignItems='stretch' spacing='4'>
					<Box>
						<Box fontSize='sm' mb='2'>
							Hari ini {moment().format('LL')}
						</Box>
						{todayItems.length === 0 ? (
							<Link passHref href='/app/orders/new'>
								<Button as={'a'} variant='outline' size='sm'>
									+ Tambah Pesanan
								</Button>
							</Link>
						) : (
							<Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap='2'>
								{todayItems.map((i, idx) => (
									<OrderCard key={idx} order={i} />
								))}
							</Grid>
						)}
					</Box>
					{yesterdayItems.length > 0 && (
						<Box>
							<Box fontSize='sm' mb='2'>
								Kemarin {moment().set('day', -1).format('LL')}
							</Box>
							<Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap='2'>
								{yesterdayItems.map((i, idx) => (
									<OrderCard key={idx} order={i} />
								))}
							</Grid>
						</Box>
					)}
					{thisMonthItems.length > 0 && (
						<Box>
							<Box fontSize='sm' mb='2'>
								{moment().format('MMMM YYYY')}
							</Box>
							<Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap='2'>
								{thisMonthItems.map((i, idx) => (
									<OrderCard key={idx} order={i} />
								))}
							</Grid>
						</Box>
					)}
				</VStack>
			)}
		</Box>
	)
}

export default withProtectedRoute(Orders)
