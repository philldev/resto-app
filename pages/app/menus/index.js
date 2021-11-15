import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import {
	AddIcon,
	CloseIcon,
	DeleteIcon,
	EditIcon,
	SearchIcon,
} from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Grid, HStack, Text } from '@chakra-ui/layout'
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
import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/tabs'
import Image from 'next/image'
import * as React from 'react'
import { AppPage } from '../../../components/common/AppPage'
import { CogIcon } from '../../../components/common/icons/CogIcon'
import { DotsHorizontal } from '../../../components/common/icons/DotsHorizontal'
import { MenuIcon } from '../../../components/common/icons/MenuIcon'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { MenuCategoryForm } from '../../../components/MenuCategoryForm'
import { MenuForm } from '../../../components/MenuForm'
import {
	MenuCategoryProvider,
	useMenuCategory,
} from '../../../context/MenuCategory'
import { MenusProvider, useMenus } from '../../../context/Menus'
import { useUserResto } from '../../../context/Resto'
import { TabsProvider, useTabs } from '../../../context/Tabs'

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
						<TabsProvider>
							<MenuTabs />
						</TabsProvider>
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

const MenuTabs = () => {
	const { tabIndex, handleTabsChange } = useTabs()
	return (
		<Tabs
			index={tabIndex}
			onChange={handleTabsChange}
			variant='soft-rounded'
			flex='1'
			overflow='hidden'
		>
			<MenuTabList />
			<MenuPanels />
		</Tabs>
	)
}

const MenuPanels = () => {
	const { menuCategories, initLoading } = useMenuCategory()
	const { menus } = useMenus()
	const { searchQuery } = useTabs()
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
			<TabPanel>
				{menus.length === 0 && <Text color='gray.500'>Belum ada menu</Text>}
				{searchQuery.length > 0 && (
					<Text color='gray.500' mb='4'>
						Pencarian : {searchQuery}
					</Text>
				)}
				<Grid gridTemplateColumns='1fr 1fr' gridGap='4'>
					{searchQuery.length === 0
						? menus.map((menu) => <MenuItem menu={menu} key={menu.id} />)
						: menus
								.filter((m) => m.name.includes(searchQuery))
								.map((menu) => <MenuItem menu={menu} key={menu.id} />)}
				</Grid>
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
	const { isSearching, toggleIsSearching, searchQuery, handleQueryChange } =
		useTabs()
	if (initLoading) return null
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
						placeholder='Cari menu'
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
			)}
		</TabList>
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

export default withProtectedRoute(Menus)
