import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { createDocId } from '../../../firebase/helper/createDocId'
import Image from 'next/image'
import { Button } from '@chakra-ui/button'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal'
import { useDisclosure } from '@chakra-ui/hooks'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Select } from '@chakra-ui/select'

function Menus() {
	return (
		<AppPage displayHeader={false}>
			<Flex flex='1' flexDir='column' w='full' overflow='hidden'>
				<Flex alignItems='center' justifyContent='space-between' p='4'>
					<Box fontSize='xl'>Menu</Box>
					<SearchIcon />
				</Flex>
				<Tabs variant='soft-rounded' flex='1' overflowY='auto' overflowX='auto'>
					<TabList flex='0' overflowX='auto' overflowY='hidden' p='2' px='4'>
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
						h='calc(100% - 56px)'
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
									.map((menu) => (
										<MenuItem menu={menu} key={menu.id} />
									))}
							</TabPanel>
						))}
					</TabPanels>
				</Tabs>
				<Flex p='4' borderTop='1px solid' borderTopColor='gray.700'>
					<AddMenu />
				</Flex>
			</Flex>
		</AppPage>
	)
}

const MenuItem = ({ menu }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<MenuCard onClick={onOpen} menu={menu} />
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg='gray.800' mx='4'>
					<ModalHeader>Detail Menu</ModalHeader>
					<ModalCloseButton />
					<ModalBody></ModalBody>
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

const MenuCard = ({ menu, ...props }) => {
	return (
		<Box as='button' textAlign='left' rounded='xl' overflow='hidden' {...props}>
			<Box pos='relative' h='28'>
				<Image
					layout='fill'
					objectFit='cover'
					src={menu.imageURL}
					alt={menu.name}
				/>
			</Box>
			<Box p='4' bg='gray.800'>
				<Text fontWeight='bold' mb='1'>
					{menu.name}
				</Text>
				<Text>Rp {menu.price}</Text>
			</Box>
		</Box>
	)
}

const AddMenu = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Button
				size='sm'
				onClick={onOpen}
				colorScheme='teal'
				w='full'
				leftIcon={<AddIcon />}
			>
				Tambah Menu
			</Button>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg='gray.800' mx='4'>
					<ModalHeader>Tambah Menu</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<AddMenuForm />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

const AddMenuForm = () => {
	return (
		<Flex flexDir='column' pb='4'>
			<VStack spacing='0' mb='4'>
				<FormControl w='full'>
					<FormLabel>Nama*</FormLabel>
					<Input
						w='full'
						bg='gray.700'
						border='none'
						placeholder='Masukan name menu'
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'></FormHelperText>
				</FormControl>
				<FormControl w='full'>
					<FormLabel>Harga*</FormLabel>
					<Input
						w='full'
						bg='gray.700'
						border='none'
						type='number'
						placeholder='Masukan harga menu'
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'></FormHelperText>
				</FormControl>
				<FormControl id='country'>
					<FormLabel>Kategori*</FormLabel>
					<Select placeholder='Pilih Kategori'>
						{menuCategories.map((i) => (
							<option key={i.id}>{i.name}</option>
						))}
					</Select>
					<FormHelperText fontSize='sm' color='red.400' mt='2'></FormHelperText>
				</FormControl>
				<FormControl w='full'>
					<FormLabel>Foto</FormLabel>
					<Button w='full' variant='outline'>
						Upload Foto
					</Button>
					<FormHelperText fontSize='sm' color='red.400' mt='2'></FormHelperText>
				</FormControl>
			</VStack>
			<VStack>
				<Button w='full' colorScheme='teal'>Tambah Menu</Button>
				<Button w='full' variant='outline' colorScheme='red'>Batal</Button>
			</VStack>
		</Flex>
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
