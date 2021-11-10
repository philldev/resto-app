import { SearchIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { createDocId } from '../../../firebase/helper/createDocId'
import Image from 'next/image'

function Menus() {
	return (
		<AppPage displayHeader={false}>
			<Flex flex='1' flexDir='column' w='full' overflow='hidden'>
				<Flex alignItems='center' justifyContent='space-between' py='2' px='4'>
					<Box fontSize='xl'>Menu</Box>
					<SearchIcon />
				</Flex>
				<Tabs variant='enclosed' flex='1' overflowY='auto' overflowX='auto'>
					<TabList flex='0' overflowX='auto' overflowY='hidden'>
						{menuCategories.map((item) => (
							<Tab
								_active={{
									boxShadow: 'none',
								}}
								_focus={{
									boxShadow: 'none',
								}}
								key={item.id}
							>
								{item.name}
							</Tab>
						))}
					</TabList>
					<TabPanels
						bg='gray.900'
						d='flex'
						h='calc(100% - 42px)'
						flexDir='column'
						flex='1'
						overflowY='auto'
					>
						{menuCategories.map((cat) => (
							<TabPanel
								key={cat.id}
								display='grid'
								gridTemplateColumns='1fr 1fr'
								gridGap='4'
							>
								{menus
									.filter((i) => i.categoryId === cat.id)
									.map((i) => (
										<Box rounded='xl' key={i.id} overflow='hidden'>
											<Box pos='relative' h='28'>
												<Image
													layout='fill'
													objectFit='cover'
													src={i.imageURL}
													alt={i.name}
												/>
											</Box>
											<Box p='4' bg='gray.800'>
												<Text fontWeight='bold' mb='1'>
													{i.name}
												</Text>
												<Text>Rp {i.price}</Text>
											</Box>
										</Box>
									))}
							</TabPanel>
						))}
					</TabPanels>
				</Tabs>
			</Flex>
		</AppPage>
	)
}

const menuCategories = [
	{
		id: createDocId(),
		name: 'Makanan',
	},
	{
		id: createDocId(),
		name: 'Minuman',
	},
	{
		id: createDocId(),
		name: 'Cemilan',
	},
	{
		id: createDocId(),
		name: 'Cemilan',
	},
	{
		id: createDocId(),
		name: 'Cemilan',
	},
]

const menus = [
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[0].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[0].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[0].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[0].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[0].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[1].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[1].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[1].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[1].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[1].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[2].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[2].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[2].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[2].id,
	},
	{
		id: createDocId(),
		name: 'Food 1',
		price: 10000,
		imageURL:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
		categoryId: menuCategories[2].id,
	},
]

export default withProtectedRoute(Menus)
