import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { AddIcon } from '@chakra-ui/icons'
import {
	Box,
	Divider,
	Flex,
	Grid, Text,
	VStack
} from '@chakra-ui/layout'
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay
} from '@chakra-ui/modal'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { OrderCard } from '../../../components/OrderCard'
import { useUserResto } from '../../../context/Resto'
import { TabsProvider, useTabs } from '../../../context/Tabs'
import { useOrderItems } from '../../../hooks/order/useOrderItems'

const Orders = () => {
	return (
		<AppPage displayHeader={false}>
			<Flex bg='gray.900' flex='1' flexDir='column' w='full' overflow='hidden'>
				<Topbar />
				<TabsProvider>
					<OrderTabs />
				</TabsProvider>
				<ActionsDrawer />
			</Flex>
		</AppPage>
	)
}

const Topbar = () => {
	const { currentResto } = useUserResto()
	return (
		<Flex borderBottom='1px solid var(--chakra-colors-gray-700)'>
			<Flex
				maxW='container.md'
				w='full'
				mx='auto'
				alignItems='center'
				justifyContent='space-between'
				h='14'
				px='2'
			>
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
			</Flex>
		</Flex>
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
				bottom='84px'
				right='16px'
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
	return (
		<TabList
			alignItems='center'
			flex='0'
			overflowX='auto'
			overflowY='hidden'
			p='2'
			pt='4'
			pos='relative'
			maxW='container.md'
			w='full'
			mx='auto'
		>
			<Tab flexShrink='0'>Hari Ini</Tab>
			<Tab flexShrink='0'>Minggu Ini</Tab>
			<Tab flexShrink='0'>Bulan Ini</Tab>
			<Tab flexShrink='0'>Semua</Tab>
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
				<TabPanel p='2' pt='0' key={index} overflowY='auto'>
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
