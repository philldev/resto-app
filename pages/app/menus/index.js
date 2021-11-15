import { Button, IconButton } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import {
	AddIcon,
	CloseIcon,
	DeleteIcon,
	EditIcon,
	SearchIcon,
} from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Grid, HStack, Text, VStack } from '@chakra-ui/layout'
import {
	Menu,
	MenuButton,
	MenuItem as MenuItemChakra,
	MenuList,
} from '@chakra-ui/menu'
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
	ModalOverlay,
} from '@chakra-ui/modal'
import { Select } from '@chakra-ui/select'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { motion } from 'framer-motion'
import Image from 'next/image'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { AppPage } from '../../../components/common/AppPage'
import { CogIcon } from '../../../components/common/icons/CogIcon'
import { DotsHorizontal } from '../../../components/common/icons/DotsHorizontal'
import { MenuIcon } from '../../../components/common/icons/MenuIcon'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import {
	MenuCategoryProvider,
	useMenuCategory,
} from '../../../context/MenuCategory'
import { MenusProvider, useMenus } from '../../../context/Menus'
import { useUserResto } from '../../../context/Resto'
import { MenuCategoryResolver } from '../../../utils/formSchema/menuCategorySchema'
import { MenuResolver } from '../../../utils/formSchema/menuSchema'

const PLACEHOLDER_MENU_IMG =
	'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'

function Menus() {
	const { currentResto } = useUserResto()
	if (!currentResto) return null
	return (
		<AppPage displayHeader={false}>
			<MenuCategoryProvider>
				<MenusProvider>
					<Flex flex='1' flexDir='column' w='full' overflow='hidden'>
						<Flex
							alignItems='center'
							justifyContent='space-between'
							p='4'
							pb='2'
						>
							<Flex alignItems='center'>
								<MenuIcon mr='2' flex='1' w='6' h='6' />
								<Text fontSize='xl'>
									<strong>{currentResto.name}</strong> Menu
								</Text>
							</Flex>
							<CogIcon w='6' h='6' />
						</Flex>
						<MenuTabsProvider>
							<MenuTabs />
						</MenuTabsProvider>
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
				</MenusProvider>
			</MenuCategoryProvider>
		</AppPage>
	)
}

const MenuTabsContext = React.createContext(null)

const MenuTabsProvider = ({ children }) => {
	const [tabIndex, setTabIndex] = React.useState(0)
	const [isSearching, setIsSearching] = React.useState(false)
	const handleTabsChange = (index) => setTabIndex(index)
	const toggleIsSearching = () => setIsSearching((p) => !p)

	React.useEffect(() => {
		if (isSearching) setTabIndex(0)
	}, [isSearching])

	const value = { tabIndex, handleTabsChange, isSearching, toggleIsSearching }
	return (
		<MenuTabsContext.Provider value={value}>
			{children}
		</MenuTabsContext.Provider>
	)
}

const useMenuTabs = () => {
	const ctx = React.useContext(MenuTabsContext)
	if (ctx === undefined) throw new Error('Context not provided')
	return ctx
}

const MenuTabs = () => {
	const { tabIndex, handleTabsChange } = useMenuTabs()
	return (
		<Tabs
			index={tabIndex}
			onChange={handleTabsChange}
			variant='soft-rounded'
			flex='1'
			overflow='hidden'
		>
			<TabList
				alignItems='center'
				flex='0'
				overflowX='auto'
				overflowY='hidden'
				p='2'
				px='4'
				pos='relative'
			>
				<MenuTabList />
			</TabList>
			<MenuPanels />
		</Tabs>
	)
}

const MenuPanels = () => {
	const { menuCategories, initLoading } = useMenuCategory()
	const { menus } = useMenus()
	if (initLoading) return null
	return (
		<TabPanels
			bg='gray.900'
			d='flex'
			h='calc(100% - 56px)'
			flexDir='column'
			flex='1'
			overflowY='auto'
		>
			<TabPanel display='grid' gridTemplateColumns='1fr 1fr' gridGap='4'>
				{menus.length === 0 && <Text color='gray.500'>Belum ada menu</Text>}
				{menus.map((menu) => (
					<MenuItem menu={menu} key={menu.id} />
				))}
			</TabPanel>
			{menuCategories.map((cat) => (
				<TabPanel key={cat.id}>
					<Flex justifyContent='space-between'>
						<Box
							mb='4'
							fontSize='2xl'
							fontWeight='bold'
							textTransform='uppercase'
						>
							{cat.name}
						</Box>
						<CategorySettings category={cat} />
					</Flex>
					<Grid gridTemplateColumns='1fr 1fr' gridGap='4'>
						{menus
							.filter((i) => i.categoryId === cat.id)
							.map((menu) => (
								<MenuItem menu={menu} key={menu.id} />
							))}
					</Grid>
				</TabPanel>
			))}
		</TabPanels>
	)
}

const MenuTabList = () => {
	const { menuCategories, initLoading } = useMenuCategory()
	const { isSearching, toggleIsSearching } = useMenuTabs()

	if (initLoading) return null
	if (isSearching)
		return (
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
				<Input bg='gray.900' placeholder='Cari menu' rounded='3xl' pl='12' />
			</Flex>
		)
	return (
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
			{menuCategories.length === 0 && (
				<Text ml='4' color='gray.400'>
					Belum ada kategori
				</Text>
			)}
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
		</>
	)
}

const CategorySettings = ({ category }) => {
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				icon={<DotsHorizontal h='6' w='6' />}
				alignItems='center'
				justifyContent='center'
				d='flex'
				variant='ghost'
			/>

			<MenuList>
				<EditMenuCategory category={category} />
				<DeleteMenuCategory category={category} />
			</MenuList>
		</Menu>
	)
}

const EditMenuCategory = ({ category }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<MenuItemChakra onClick={onOpen}>Ubah Nama Kategori</MenuItemChakra>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg='gray.800' mx='4'>
					<ModalHeader>Edit Kategori</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<MenuCategoryForm isEditing category={category} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

const DeleteMenuCategory = ({ category }) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const onClose = () => setIsOpen(false)
	const onOpen = () => setIsOpen(true)
	const cancelRef = React.useRef()
	const [isLoading, setIsLoading] = React.useState(false)
	const { deleteMenuCategory } = useMenuCategory()

	const onDelete = async () => {
		try {
			setIsLoading(true)
			await deleteMenuCategory(category)
			onClose()
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}
	return (
		<>
			<MenuItemChakra onClick={onOpen}>Hapus Kategori</MenuItemChakra>
			<AlertDialog
				isCentered
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent mx='4' bg='gray.800'>
						<AlertDialogHeader fontSize='lg'>
							Hapus Kategori{' '}
							<Text as='span' fontWeight='bold'>
								{category.name}
							</Text>
						</AlertDialogHeader>
						<AlertDialogBody>
							Are you sure? You can&apos;t undo this action afterwards.
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Tidak
							</Button>
							<Button
								isLoading={isLoading}
								colorScheme='red'
								onClick={onDelete}
								ml={3}
							>
								Ya
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
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
						src={menu.imageURL ?? PLACEHOLDER_MENU_IMG}
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
	const { deleteMenu } = useMenus()
	const [isLoading, setIsLoading] = React.useState(false)
	const onDelete = async () => {
		try {
			setIsLoading(true)
			await deleteMenu(menu)
			onClose()
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

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
							<Button
								onClick={onDelete}
								isLoading={isLoading}
								colorScheme='red'
								ml={3}
							>
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
					src={menu.imageURL ?? PLACEHOLDER_MENU_IMG}
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
	const { menuCategories } = useMenuCategory()
	return (
		<>
			<Button
				disabled={menuCategories.length === 0}
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
						<MenuForm onSuccess={onClose} onCancel={onClose} />
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
						<MenuCategoryForm onSuccess={onClose} onCancel={onClose} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

const MenuCategoryForm = ({ isEditing, category, onSuccess, onCancel }) => {
	const { addMenuCategory, updateMenuCategory } = useMenuCategory()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: category,
		resolver: MenuCategoryResolver,
	})
	const [isLoading, setIsLoading] = React.useState()
	const onSubmit = async (data) => {
		try {
			setIsLoading(true)
			if (isEditing) {
				await updateMenuCategory(data)
			} else {
				await addMenuCategory(data)
			}
			onSuccess()
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}
	return (
		<Flex as='form' onSubmit={handleSubmit(onSubmit)} flexDir='column' pb='4'>
			<VStack spacing='0' mb='4'>
				<FormControl w='full'>
					<FormLabel>Nama*</FormLabel>
					<Input
						w='full'
						bg='gray.700'
						border='none'
						placeholder='Masukan name kategori'
						{...register('name')}
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'>
						{errors.name?.message}
					</FormHelperText>
				</FormControl>
			</VStack>
			<VStack>
				<Button isLoading={isLoading} type='submit' w='full' colorScheme='teal'>
					{isEditing ? 'Edit' : 'Tambah'}
				</Button>
				<Button
					isLoading={isLoading}
					onClick={onCancel}
					w='full'
					variant='outline'
				>
					Batal
				</Button>
			</VStack>
		</Flex>
	)
}

const MenuForm = ({ isEditing, menu, onSuccess, onCancel }) => {
	const { addMenu, updateMenu } = useMenus()
	const { menuCategories } = useMenuCategory()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: menu,
		resolver: MenuResolver,
	})

	const [isLoading, setIsLoading] = React.useState()
	const onSubmit = async (data) => {
		try {
			setIsLoading(true)
			if (isEditing) {
				await updateMenu(data)
			} else {
				await addMenu(data)
			}
			onSuccess()
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	return (
		<Flex as='form' onSubmit={handleSubmit(onSubmit)} flexDir='column' pb='4'>
			<VStack spacing='0' mb='4'>
				<FormControl w='full'>
					<FormLabel>Nama*</FormLabel>
					<Input
						w='full'
						bg='gray.700'
						border='none'
						placeholder='Masukan name menu'
						{...register('name')}
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'>
						{errors.name?.message}
					</FormHelperText>
				</FormControl>
				<FormControl w='full'>
					<FormLabel>Harga*</FormLabel>
					<Input
						w='full'
						bg='gray.700'
						border='none'
						type='number'
						placeholder='Masukan harga menu'
						{...register('price')}
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'>
						{errors.price?.message}
					</FormHelperText>
				</FormControl>
				<FormControl id='country'>
					<FormLabel>Kategori*</FormLabel>
					<Select placeholder='Pilih Kategori' {...register('categoryId')}>
						{menuCategories.map((i) => (
							<option
								value={i.id}
								selected={i.id === menu?.categoryId}
								key={i.id}
							>
								{i.name}
							</option>
						))}
					</Select>
					<FormHelperText fontSize='sm' color='red.400' mt='2'>
						{errors.categoryId?.message}
					</FormHelperText>
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
				<Button type='submit' isLoading={isLoading} w='full' colorScheme='teal'>
					{isEditing ? 'Edit' : 'Tambah'}
				</Button>
				<Button onClick={onCancel} w='full' variant='outline'>
					Batal
				</Button>
			</VStack>
		</Flex>
	)
}

const menuCategories = [
	// {
	// 	id: createDocId(),
	// 	name: 'Makanan',
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Minuman',
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Cemilan',
	// },
]

const menus = [
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[0].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[0].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[0].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[0].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[0].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[1].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[1].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[1].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[1].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[1].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[2].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[2].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[2].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[2].id,
	// },
	// {
	// 	id: createDocId(),
	// 	name: 'Food 1',
	// 	price: 10000,
	// 	imageURL:
	// 		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
	// 	categoryId: menuCategories[2].id,
	// },
]

export default withProtectedRoute(Menus)
