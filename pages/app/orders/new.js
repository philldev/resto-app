import { Button, IconButton } from '@chakra-ui/button'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal'
import { useDisclosure } from '@chakra-ui/hooks'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Badge, Box, Divider, Flex, Text, VStack } from '@chakra-ui/layout'
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	FormControl,
	FormLabel,
	Table,
	Tbody,
	Td,
	Textarea,
	Tfoot,
	Th,
	Thead,
	Input,
	FormHelperText,
	Tr,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'
import { MenuIcon } from '../../../components/common/icons/MenuIcon'
import { MenuTabs } from '../../../components/MenuTabs/MenuTabs'
import { MenuCategoryProvider } from '../../../context/MenuCategory'
import { MenusProvider } from '../../../context/Menus'
import {
	NewOrderProvider,
	OrderTypeEnum,
	useNewOrder,
} from '../../../context/NewOrder'
import { useUserResto } from '../../../context/Resto'
import { TabsProvider } from '../../../context/Tabs'
import { useIsMdSize } from '../../../hooks/windowSize'
import { PLACEHOLDER_MENU_IMG } from '../../../utils/imagePlaceholders'

function NewOrder() {
	const { currentResto } = useUserResto()
	if (!currentResto) return null
	return (
		<NewOrderProvider>
			<OrderTypeDialog />
			<Flex flexDir='column' w='100vw' h='100vh'>
				<Flex flex='1' flexDir='column' w='full' overflow='hidden'>
					<Topbar />
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

const Topbar = () => {
	const router = useRouter()
	return (
		<Flex alignItems='center' justifyContent='space-between' p='4' pb='2'>
			<Flex alignItems='center' wrap='wrap'>
				<Flex alignItems='center'>
					<MenuIcon mr='2' flex='1' w='6' h='6' />
					<Text fontSize='xl'>Pesanan Baru</Text>
				</Flex>
				<Divider orientation='vertical' mx='1' />
				<OrderTypeLabel />
			</Flex>
			<IconButton
				variant='ghost'
				onClick={() => router.back()}
				icon={<ArrowBackIcon w='6' h='6' />}
			/>
		</Flex>
	)
}

const OrderTypeLabel = () => {
	const { orderType, chooseOrderType } = useNewOrder()
	if (!orderType) return null
	return (
		<Flex alignItems='center'>
			{orderType === OrderTypeEnum.DINE_IN && (
				<Badge colorScheme='blue' variant='solid'>
					Makan Di Tempat
				</Badge>
			)}
			{orderType === OrderTypeEnum.TAKE_AWAY && (
				<Badge colorScheme='blue' variant='solid'> BAWA PULANG</Badge>
			)}
			{orderType && (
				<Button
					size='xs'
					variant='ghost'
					textDecor='underline'
					onClick={() => chooseOrderType(null)}
				>
					Ganti
				</Button>
			)}
		</Flex>
	)
}

const OrderTypeDialog = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { orderType, chooseOrderType } = useNewOrder()
	React.useEffect(() => {
		if (!orderType && !isOpen) {
			onOpen()
		}
	}, [orderType, onOpen, isOpen])
	return (
		<>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg='gray.800' mx='4'>
					<ModalHeader>Pilih tipe pesanan</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack alignItems='stretch' mb='4'>
							<Button
								onClick={() => {
									chooseOrderType(OrderTypeEnum.DINE_IN)
									onClose()
								}}
								variant='outline'
							>
								Makan di tempat
							</Button>
							<Button
								onClick={() => {
									chooseOrderType(OrderTypeEnum.TAKE_AWAY)
									onClose()
								}}
								variant='outline'
							>
								Bawa pulang
							</Button>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
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
	const isMdSize = useIsMdSize()
	return (
		<>
			<Button disabled={orderItems.length === 0} ref={btnRef} onClick={onOpen}>
				Lihat Detail Pesanan
			</Button>
			<Drawer
				isOpen={isOpen}
				placement={isMdSize ? 'right' : 'bottom'}
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent
					maxW={isMdSize ? '400px' : undefined}
					maxH={isMdSize ? '100vh' : '50vh'}
					bg='gray.800'
				>
					<DrawerCloseButton />
					<DrawerHeader d='flex' flexDir='column'>
						<Text>Detail Pesanan</Text> <OrderTypeLabel />
					</DrawerHeader>
					<DrawerBody>
						<NewOrderDetailForm onClose={onClose} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

const NewOrderDetailForm = ({ onClose, onSuccess }) => {
	const { orderItems } = useNewOrder()
	return (
		<VStack maxW='container.md' mx='auto' alignItems='stretch' spacing='6'>
			<VStack alignItems='stretch' spacing='4' flexDir='column' pb='4'>
				<FormControl w='full'>
					<FormLabel>Nama Kostumer*</FormLabel>
					<Input
						w='full'
						bg='gray.700'
						border='none'
						placeholder='Masukan nama kustomer'
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'></FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel mb='1'>Item Pesanan</FormLabel>
					<VStack>
						{orderItems.map((item, index) => (
							<Flex
								fontSize='sm'
								w='full'
								key={index}
								borderBottom='1px solid'
								py='2'
								borderBottomColor='gray.700'
							>
								<Box
									flexShrink='0'
									pos='relative'
									w='45px'
									h='45px'
									rounded='lg'
									overflow='hidden'
								>
									<Image
										layout='fill'
										objectFit='cover'
										src={item.imageURL ?? PLACEHOLDER_MENU_IMG}
										alt={'Order'}
									/>
								</Box>
								<Flex
									alignItems='center'
									w='full'
									ml='2'
									justifyContent='space-between'
								>
									<Box>
										<Text>{item.name}</Text>
										<Text>Rp. {item.price}</Text>
									</Box>
									<Text p='1'>x {item.qty}</Text>
								</Flex>
							</Flex>
						))}
					</VStack>
				</FormControl>
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

const OrderItemsTable = () => {
	const { orderItems } = useNewOrder()
	return (
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
					<OrderDetailTableItem orderItem={item} key={index} />
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
	)
}

const OrderDetailTableItem = ({ orderItem }) => {
	return (
		<Tr>
			<Td>{orderItem.name}</Td>
			<Td isNumeric>{orderItem.qty}</Td>
			<Td isNumeric>Rp {orderItem.price}</Td>
		</Tr>
	)
}

export default NewOrder
