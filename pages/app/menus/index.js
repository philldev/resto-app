import { Button } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/modal'
import { Select } from '@chakra-ui/select'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import Image from 'next/image'
import * as React from 'react'
import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { createDocId } from '../../../firebase/helper/createDocId'

function Menus() {
	return (
		<AppPage displayHeader={false}>
			<Flex flex='1' flexDir='column' w='full' overflow='hidden'>
				<Flex alignItems='center' justifyContent='space-between' p='4'>
					<Box fontSize='xl'>Menu</Box>
				</Flex>
				<Tabs variant='soft-rounded' flex='1' overflowY='auto' overflowX='auto'>
					<TabList flex='0' overflowX='auto' overflowY='hidden' p='2' px='4'>
						<Box
							w='10'
							h='10'
							flexShrink='0'
							alignItems='center'
							justifyContent='center'
							mr='2'
							d='flex'
							as='button'
						>
							<SearchIcon />
						</Box>
						<Tab
							_active={{
								boxShadow: 'none',
							}}
							_focus={{
								boxShadow: 'none',
							}}
						>
							Semua
						</Tab>
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
						<TabPanel display='grid' gridTemplateColumns='1fr 1fr' gridGap='4'>
							{menus.map((menu) => (
								<MenuItem menu={menu} key={menu.id} />
							))}
						</TabPanel>
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
				<Box
					py='4'
					borderTop='1px solid'
					borderTopColor='gray.700'
					overflowX='auto'
				>
					<HStack w='max-content' px='4' overflowX='auto'>
						<AddMenu />
						<AddMenuCategory />
					</HStack>
				</Box>
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
					<ModalBody>
						<MenuDetail menu={menu} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

const MenuDetail = ({ menu }) => {
	return (
		<Flex pb='4' flexDir='column'>
			<Flex mb='4'>
				<Box
					w='30%'
					mr='4'
					h='20'
					pos='relative'
					rounded='xl'
					overflow='hidden'
				>
					<Image
						layout='fill'
						objectFit='cover'
						src={menu.imageURL}
						alt={menu.name}
					/>
				</Box>
				<Box>
					<Text fontWeight='bold' textAlign='left'>
						{menu.name}
					</Text>
					<Text textAlign='left'>Rp {menu.price}</Text>
				</Box>
			</Flex>
			<HStack>
				<EditMenu menu={menu} />
				<DeleteMenu menu={menu} />
			</HStack>
		</Flex>
	)
}

const DeleteMenu = ({ menu }) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const onClose = () => setIsOpen(false)
	const onOpen = () => setIsOpen(true)
	const cancelRef = React.useRef()
	return (
		<>
			<Button
				onClick={onOpen}
				leftIcon={<DeleteIcon />}
				colorScheme='gray'
				variant='outline'
			>
				Hapus
			</Button>
			<AlertDialog
				isCentered
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent mx='4' bg='gray.800'>
						<AlertDialogHeader fontSize='lg'>
							Hapus Menu{' '}
							<Text as='span' fontWeight='bold'>
								{menu.name}
							</Text>
						</AlertDialogHeader>
						<AlertDialogBody>
							Are you sure? You can&apos;t undo this action afterwards.
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Tidak
							</Button>
							<Button colorScheme='red' onClick={onClose} ml={3}>
								Ya
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	)
}

const EditMenu = ({ menu }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Button
				onClick={onOpen}
				leftIcon={<EditIcon />}
				colorScheme='gray'
				variant='outline'
			>
				Edit
			</Button>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg='gray.800' mx='4'>
					<ModalHeader>Edit Menu</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<MenuForm menu={menu} isEditing />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

const MenuCard = ({ menu, ...props }) => {
	return (
		<Box as='button' textAlign='left' rounded='xl' overflow='hidden' {...props}>
			<Box pos='relative' h='20'>
				<Image
					layout='fill'
					objectFit='cover'
					src={menu.imageURL}
					alt={menu.name}
				/>
			</Box>
			<Box py='2' px='4' bg='gray.800'>
				<Text fontWeight='bold'>{menu.name}</Text>
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
						<MenuForm />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

const AddMenuCategory = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Button
				size='sm'
				onClick={onOpen}
				colorScheme='teal'
				leftIcon={<AddIcon />}
			>
				Tambah Kategori
			</Button>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg='gray.800' mx='4'>
					<ModalHeader>Tambah Kategori</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<MenuCategoryForm />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

const MenuCategoryForm = ({ isEditing, menu }) => {
	return (
		<Flex flexDir='column' pb='4'>
			<VStack spacing='0' mb='4'>
				<FormControl w='full'>
					<FormLabel>Nama*</FormLabel>
					<Input
						w='full'
						bg='gray.700'
						border='none'
						placeholder='Masukan name kategori'
						value={menu?.name}
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'></FormHelperText>
				</FormControl>
			</VStack>
			<VStack>
				<Button w='full' colorScheme='teal'>
					{isEditing ? 'Edit' : 'Tambah'}
				</Button>
				<Button w='full' variant='outline'>
					Batal
				</Button>
			</VStack>
		</Flex>
	)
}

const MenuForm = ({ isEditing, menu }) => {
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
						value={menu?.name}
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
						value={menu?.price}
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'></FormHelperText>
				</FormControl>
				<FormControl id='country'>
					<FormLabel>Kategori*</FormLabel>
					<Select placeholder='Pilih Kategori'>
						{menuCategories.map((i) => (
							<option selected={i.id === menu?.categoryId} key={i.id}>
								{i.name}
							</option>
						))}
					</Select>
					<FormHelperText fontSize='sm' color='red.400' mt='2'></FormHelperText>
				</FormControl>
				<FormControl w='full'>
					<FormLabel>Foto</FormLabel>
					{isEditing && menu?.imageURL ? (
						<Box
							w='30%'
							mr='4'
							h='20'
							pos='relative'
							rounded='xl'
							overflow='hidden'
						>
							<Image
								layout='fill'
								objectFit='cover'
								src={menu.imageURL}
								alt={menu.name}
							/>
						</Box>
					) : (
						<Button w='full' variant='outline'>
							Upload Foto
						</Button>
					)}
					<FormHelperText fontSize='sm' color='red.400' mt='2'></FormHelperText>
				</FormControl>
			</VStack>
			<VStack>
				<Button w='full' colorScheme='teal'>
					{isEditing ? 'Edit' : 'Tambah'}
				</Button>
				<Button w='full' variant='outline'>
					Batal
				</Button>
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
