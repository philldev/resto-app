import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import * as React from 'react'
import { MenuIcon } from '../../../components/common/icons/MenuIcon'
import { MenuTabs } from '../../../components/MenuTabs/MenuTabs'
import { MenuCategoryProvider } from '../../../context/MenuCategory'
import { MenusProvider } from '../../../context/Menus'
import { NewOrderProvider, useNewOrder } from '../../../context/NewOrder'
import { useUserResto } from '../../../context/Resto'
import { TabsProvider } from '../../../context/Tabs'

function NewOrder() {
	const { currentResto } = useUserResto()
	const router = useRouter()
	if (!currentResto) return null
	return (
		<NewOrderProvider>
			<Flex flexDir='column' w='100vw' h='100vh'>
				<Flex flex='1' flexDir='column' w='full' overflow='hidden'>
					<Flex alignItems='center' justifyContent='space-between' p='4' pb='2'>
						<Flex alignItems='center'>
							<MenuIcon mr='2' flex='1' w='6' h='6' />
							<Text fontSize='xl'>Pesanan Baru</Text>
						</Flex>
						<IconButton
							variant='ghost'
							onClick={() => router.back()}
							icon={<ArrowBackIcon w='6' h='6' />}
						/>
					</Flex>
					<MenuCategoryProvider>
						<MenusProvider>
							<TabsProvider>
								<MenuTabs isOrdering />
							</TabsProvider>
						</MenusProvider>
					</MenuCategoryProvider>
					<BottomInfo />
				</Flex>
			</Flex>
		</NewOrderProvider>
	)
}

const BottomInfo = () => {
	const { getTotal, getTotalQty } = useNewOrder()
	return (
		<Box p='4' bg='gray.800' fontSize='sm'>
			<VStack alignItems='stretch'>
				<Flex justifyContent='space-between' w='full'>
					<Text>Total : Rp. {getTotal()}</Text>
					<Text>Total Menu : {getTotalQty()}</Text>
				</Flex>
				<OpenOrderDetailBtn />
			</VStack>
		</Box>
	)
}

const OpenOrderDetailBtn = () => {
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
				<DrawerContent h='75vh' bg='gray.800'>
					<DrawerCloseButton />
					<DrawerHeader>Detail Order</DrawerHeader>
					<DrawerBody>
						<OrderDetail />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

const OrderDetail = () => {
	const { orderItems } = useNewOrder()
	return (
		<Table size='sm'>
			<Thead>
				<Tr>
					<Th w='60%'>Menu</Th>
					<Th isNumeric>Qty</Th>
					<Th isNumeric>Harga</Th>
				</Tr>
			</Thead>
			<Tbody>
				{orderItems.map((item, index) => (
					<OrderDetailItem orderItem={item} key={index} />
				))}
			</Tbody>
		</Table>
	)
}

const OrderDetailItem = ({ orderItem }) => {
	return (
		<Tr>
			<Td>{orderItem.name}</Td>
			<Td isNumeric>{orderItem.qty}</Td>
			<Td isNumeric>Rp {orderItem.price}</Td>
		</Tr>
	)
}

export default NewOrder
