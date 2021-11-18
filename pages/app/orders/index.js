import { Button } from '@chakra-ui/button'
import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Badge, Box, Flex, Grid, HStack, Text, VStack } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { AppPage } from '../../../components/common/AppPage'
import { ClipboardListIcon } from '../../../components/common/icons/ClipboardListIcon'
import { CogIcon } from '../../../components/common/icons/CogIcon'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { TabsProvider, useTabs } from '../../../context/Tabs'
import Image from 'next/image'
import { PLACEHOLDER_MENU_IMG } from '../../../utils/imagePlaceholders'

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
						<Button colorScheme='teal'>Tambah Pesanan</Button>
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
	return (
		<TabPanels
			bg='gray.900'
			d='flex'
			h='calc(100% - 56px)'
			flexDir='column'
			flex='1'
			overflowY='auto'
		>
			<TabPanel>
				<Grid maxW='2xl' mx='auto' templateColumns='1fr' gap='2'>
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
							<Flex w='full' justifyContent='space-between' alignItems='center'>
								<Text fontSize='lg'>No. Order #222</Text>
								<Badge colorScheme='yellow'>On Progress</Badge>
							</Flex>
						</Box>
						<VStack
							p='2'
							alignItems='stretch'
							h='100px'
							pos='relative'
							overflowY='auto'
						>
							{new Array(5).fill(0).map((i, index) => (
								<Flex w='full' key={index}>
									<Box
										flexShrink='0'
										pos='relative'
										w='45px'
										h='45px'
										rounded='lg'
										overflow='hidden'
									>
										<Image
											layout='fill'
											objectFit='cover'
											src={PLACEHOLDER_MENU_IMG}
											alt={'Order'}
										/>
									</Box>
									<Flex w='full' ml='2' justifyContent='space-between'>
										<Box>
											<Text>Menu Item 1</Text>
											<Text>Rp. 20,000</Text>
										</Box>
										<Text p='1'>Qty : 10</Text>
									</Flex>
								</Flex>
							))}
						</VStack>
						<Flex
							p='2'
							bg='gray.900'
							borderTop='1px solid'
							borderTopColor='gray.700'
							w='100%'
						>
							<Text fontSize='lg'>Total Pesanan : Rp 200,000.00</Text>
						</Flex>
					</Flex>
				</Grid>
			</TabPanel>
			<TabPanel>this week</TabPanel>
			<TabPanel>this month</TabPanel>
			<TabPanel>all</TabPanel>
		</TabPanels>
	)
}

export default withProtectedRoute(Orders)
