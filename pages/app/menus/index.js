import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { AddIcon } from '@chakra-ui/icons'
import { Divider, Flex, Text, VStack } from '@chakra-ui/layout'
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal'
import Image from 'next/image'
import * as React from 'react'
import { AppPage } from '../../../components/common/AppPage'
import { AppTopbar } from '../../../components/common/AppTopbar'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { MenuCategoryForm } from '../../../components/MenuCategoryForm'
import { MenuForm } from '../../../components/MenuForm'
import { MenuTabs } from '../../../components/MenuTabs/MenuTabs'
import { More } from '../../../components/More'
import {
	MenuCategoryProvider,
	useMenuCategory,
} from '../../../context/MenuCategory'
import { MenusProvider } from '../../../context/Menus'
import { useUserResto } from '../../../context/Resto'
import { TabsProvider } from '../../../context/Tabs'

const Menus = () => {
	const { currentResto } = useUserResto()
	if (!currentResto) return null
	return (
		<AppPage displayHeader={false}>
			<MenuCategoryProvider>
				<MenusProvider>
					<Flex
						bg='gray.900'
						flex='1'
						flexDir='column'
						w='full'
						overflow='hidden'
					>
						<AppTopbar>
							<Flex justifyContent='space-between' maxW='container.md' w='full'>
								<Flex alignItems='center'>
									<Image
										width='32px'
										height='32px'
										alt='logo'
										src='/logo.png'
									/>
									<Text fontSize='lg' ml='2'>
										{currentResto.name}
									</Text>
									<Divider h='24px' orientation='vertical' mx='2' />
									<Text fontSize='lg' fontWeight='bold'>
										Menu
									</Text>
								</Flex>
								<More />
							</Flex>
						</AppTopbar>
						<TabsProvider>
							<MenuTabs />
						</TabsProvider>
						<ActionsDrawer />
					</Flex>
				</MenusProvider>
			</MenuCategoryProvider>
		</AppPage>
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
							<AddMenu />
							<AddMenuCategory />
						</VStack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
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
				variant='outline'
				leftIcon={<AddIcon />}
			>
				Menu
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
				variant='outline'
				leftIcon={<AddIcon />}
			>
				Kategori
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
