import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import {
	AddIcon
} from '@chakra-ui/icons'
import { Box, Flex, HStack, Text } from '@chakra-ui/layout'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/modal'
import * as React from 'react'
import { AppPage } from '../../../components/common/AppPage'
import { CogIcon } from '../../../components/common/icons/CogIcon'
import { MenuIcon } from '../../../components/common/icons/MenuIcon'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { MenuCategoryForm } from '../../../components/MenuCategoryForm'
import { MenuForm } from '../../../components/MenuForm'
import { MenuTabs } from '../../../components/MenuTabs'
import {
	MenuCategoryProvider,
	useMenuCategory
} from '../../../context/MenuCategory'
import { MenusProvider } from '../../../context/Menus'
import { useUserResto } from '../../../context/Resto'
import { TabsProvider } from '../../../context/Tabs'


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
