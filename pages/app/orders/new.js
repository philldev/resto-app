import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import {
	FormControl,FormLabel,
	Drawer,
	Textarea,
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
	Tfoot,
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
	const { orderItems } = useNewOrder()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = React.useRef()
	return (
		<>
			<Button disabled={orderItems.length === 0} ref={btnRef} onClick={onOpen}>
				Lihat Detail Pesanan
			</Button>
			<Drawer
				isOpen={isOpen}
				placement='bottom'
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent maxH='50vh' bg='gray.800'>
					<DrawerCloseButton />
					<DrawerHeader>Detail Pesanan</DrawerHeader>
					<DrawerBody>
						<OrderDetailForm onClose={onClose} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

const OrderDetailForm = ({onClose, onSuccess}) => {
	const { orderItems } = useNewOrder()
	return (
		<VStack alignItems='stretch' spacing='6'>
			<VStack alignItems='stretch' spacing='4' flexDir='column' pb='4'>
				<Box>
					<FormControl mb='1'>Item Pesanan</FormControl>
					<Table size='sm' variant='simple'>
						<Thead>
							<Tr>
								<Th>Nama Menu</Th>
								<Th isNumeric>Qty</Th>
								<Th isNumeric w='40%'>
									Harga
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{orderItems.map((item, index) => (
								<OrderDetailItem orderItem={item} key={index} />
							))}
						</Tbody>
						<Tfoot>
							{/* <Tr>
								<Td borderColor='transparent'></Td>
								<Td borderColor='transparent' isNumeric>
									Jumlah Menu
								</Td>
								<Td borderColor='transparent' isNumeric fontWeight='bold'>
									X {getTotalQty()}
								</Td>
							</Tr> */}
							{/* <Tr>
								<Td borderColor='transparent'></Td>
								<Td borderColor='transparent' isNumeric>
									Total Menu
								</Td>
								<Td borderColor='transparent' isNumeric fontWeight='bold'>
									Rp {getTotal()}
								</Td>
							</Tr>
							<Tr>
								<Td borderColor='transparent'></Td>
								<Td borderColor='transparent' isNumeric>
									Pajak 3%
								</Td>
								<Td borderColor='transparent' isNumeric fontWeight='bold'>
									Rp {(getTotal() * .03).toFixed(2)}
								</Td>
							</Tr>
							<Tr>
								<Td borderColor='transparent'></Td>
								<Td borderColor='transparent' isNumeric>
									Total Bayar
								</Td>
								<Td borderColor='transparent' isNumeric fontSize='md' fontWeight='bold'>
									Rp { (getTotal() * .03) + getTotal()}
								</Td>
							</Tr> */}
						</Tfoot>
					</Table>
				</Box>
				<FormControl>
					<FormLabel>Catatan Pesanan</FormLabel>
					<Textarea placeholder='Catatan' />
				</FormControl>
			</VStack>
			<VStack alignItems='stretch'>
				<Button>Buat Pesanan</Button>
				<Button onClick={onClose}>Kembali ke Menu</Button>
			</VStack>
		</VStack>
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
