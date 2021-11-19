import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import {
	Drawer,
	DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader,
	DrawerOverlay
} from '@chakra-ui/react'
import * as React from 'react'
import { MenuIcon } from '../../../components/common/icons/MenuIcon'
import { MenuTabs } from '../../../components/MenuTabs'
import { MenuCategoryProvider } from '../../../context/MenuCategory'
import { MenusProvider } from '../../../context/Menus'
import { useUserResto } from '../../../context/Resto'
import { TabsProvider } from '../../../context/Tabs'

function NewOrder() {
	const { currentResto } = useUserResto()
	if (!currentResto) return null
	return (
		<Flex flexDir='column' w='100vw' h='100vh'>
			<Flex flex='1' flexDir='column' w='full' overflow='hidden'>
				<Flex alignItems='center' justifyContent='space-between' p='4' pb='2'>
					<Flex alignItems='center'>
						<MenuIcon mr='2' flex='1' w='6' h='6' />
						<Text fontSize='xl'>Order Baru</Text>
					</Flex>
					<IconButton variant='ghost' icon={<ArrowBackIcon w='6' h='6' />} />
				</Flex>
				<MenuCategoryProvider>
					<MenusProvider>
						<TabsProvider>
							<MenuTabs isOrdering />
						</TabsProvider>
					</MenusProvider>
				</MenuCategoryProvider>
				<Box 
				p='4' bg='gray.800' 
				// position='fixed' 
				// bottom='0' left='0' w='100%'
				fontSize='sm'
				>
					<VStack alignItems='stretch'>
						<Flex justifyContent='space-between' w='full'>
							<Text>Total : Rp. 250,000</Text>
							<Text>Pesanan : 10</Text>
						</Flex>
						<OrderDetail />
					</VStack>
				</Box>
			</Flex>
		</Flex>
	)
}

const OrderDetail = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = React.useRef()
	return (
		<>
			<Button ref={btnRef} onClick={onOpen}>
				Lihat Detail Pesanan
			</Button>
			<Drawer
				isOpen={isOpen}
				placement='bottom'
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent h='75vh'  bg='gray.800'>
					<DrawerCloseButton />
					<DrawerHeader>Detail Order</DrawerHeader>

					<DrawerBody></DrawerBody>

				</DrawerContent>
			</Drawer>
		</>
	)
}

export default NewOrder
