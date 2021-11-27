import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ArrowBackIcon, CalendarIcon, EditIcon } from '@chakra-ui/icons'
import {
	Box,
	Divider,
	Flex,
	Grid,
	HStack,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/layout'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal'
import { Radio, RadioGroup } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import * as React from 'react'
import { AppTopbar } from '../../../components/common/AppTopbar'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { MenuTabs } from '../../../components/MenuTabs/MenuTabs'
import { OrderItemList } from '../../../components/OrderItemsList'
import { OrderPaymentCalculator } from '../../../components/OrderPaymentCalculator'
import { MenuCategoryProvider } from '../../../context/MenuCategory'
import { MenusProvider } from '../../../context/Menus'
import { OrderingProvider, useOrdering } from '../../../context/Ordering'
import { useUserResto } from '../../../context/Resto'
import { TabsProvider } from '../../../context/Tabs'
import * as OrderApi from '../../../firebase/order'
import useQuery from '../../../hooks/useQuery'
import { getTotal, getTotalQty } from '../../../utils/calculateTotal'
import { formatPrice } from '../../../utils/formatPrice'

const Order = () => {
	return (
		<Flex bg='gray.900' flexDir='column' w='100vw' h='100vh' overflow='hidden'>
			<Topbar />
			<Flex alignItems='center' flex='1' flexDir='column' overflowY='auto'>
				<OrderDetail />
			</Flex>
			<Flex flexDir='column'></Flex>
		</Flex>
	)
}

const Topbar = () => {
	const router = useRouter()
	return (
		<AppTopbar>
			<Flex w='full' alignItems='center' justifyContent='space-between'>
				<Text fontWeight='bold' fontSize='xl'>
					Detail Pesanan
				</Text>
				<IconButton
					variant='ghost'
					onClick={() => router.back()}
					icon={<ArrowBackIcon w='6' h='6' />}
				/>
			</Flex>
		</AppTopbar>
	)
}

const OrderDetail = () => {
	const router = useRouter()
	const { currentResto } = useUserResto()
	const { isLoading, isError, data, setData } = useQuery(
		`order/${router.query.id}`,
		async () => {
			try {
				const data = await OrderApi.getOrder(currentResto.id, router.query.id)
				return data
			} catch (error) {
				throw error
			}
		}
	)

	if (isLoading) return <Box>Loading ...</Box>
	if (isError) return <Box>error ...</Box>
	if (!data) return <Box>no data</Box>
	return (
		<Box
			alignItems='stretch'
			p='2'
			py='4'
			w='100%'
			maxW='container.md'
			overflowY='auto'
		>
			<Flex alignItems='center' mb='2' justifyContent='space-between'>
				<HStack alignItems='center'>
					<Text fontSize='lg' fontWeight='bold'>
						Order #{data.no}
					</Text>
					<Divider orientation='vertical' h='6' mx='2' />
					<Text fontSize='sm' color='gray.300'>
						Meja : #{data.table}
					</Text>
					<Divider orientation='vertical' h='6' mx='2' />
					<Text fontSize='sm' color='gray.300'>
						Kostumer : {data.customer}
					</Text>
				</HStack>
			</Flex>

			<Grid mb='4' gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} gap='4'>
				<Box flex='1'>
					<Flex alignItems='center'>
						<Text fontSize='sm' color='gray.200'>
							Item Pesanan :
						</Text>
						<AddItem order={data} setOrder={setData} />
					</Flex>
					<OrderItemList orderItems={data.items} />
				</Box>
				<Grid
					autoRows='max-content'
					gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}
					gap='2'
				>
					<Box>
						<Text fontSize='sm' color='gray.400'>
							Status :
						</Text>
						<Flex>
							{data.status === 'on_progress' ? (
								<Flex alignItems='center'>
									<Box w='2' h='2' rounded='full' mr='2' bg='yellow.200' />
									<Text>Dalam Proses</Text>
								</Flex>
							) : data.status === 'completed' ? (
								<Flex alignItems='center'>
									<Box w='2' h='2' rounded='full' mr='2' bg='green.200' />
									<Text>Selesai</Text>
								</Flex>
							) : (
								<Flex alignItems='center'>
									<Box w='2' h='2' rounded='full' mr='2' bg='red.200' />
									<Text>Dibatalkan</Text>
								</Flex>
							)}
							<EditStatus order={data} setOrder={setData} />
						</Flex>
					</Box>
					<Box>
						<Text fontSize='sm' color='gray.400'>
							Tipe :
						</Text>
						{data.type === 'DINE_IN' ? (
							<Text>Makan di tempat</Text>
						) : (
							<Text>Bawa pulang</Text>
						)}
					</Box>
					<Box>
						<Text fontSize='sm' color='gray.400'>
							Status bayar :
						</Text>
						<Flex alignItems='center'>
							{data.isPaid ? (
								<>
									<Flex alignItems='center'>
										<Box w='2' h='2' rounded='full' mr='2' bg='green.200' />
										<Text>Dibayar</Text>
									</Flex>
									<Button size='xs' fontSize='8px' ml='2'>
										Lihat Transaksi
									</Button>
								</>
							) : (
								<>
									<Flex alignItems='center'>
										<Box w='2' h='2' rounded='full' mr='2' bg='yellow.200' />
										<Text>Belum bayar</Text>
									</Flex>
									<PayNow order={data} setOrder={setData} />
								</>
							)}
						</Flex>
					</Box>
					<Box>
						<Text fontSize='sm' color='gray.400'>
							Tanggal buat :
						</Text>
						<Flex alignItems='center'>
							<CalendarIcon mr='2' w='4' h='4' />
							<Text>{moment(data.createdAt.toDate()).format('L')}</Text>
						</Flex>
					</Box>
				</Grid>
			</Grid>
			<Box>
				<Text mb='2' fontSize='sm' color='gray.400'>
					Catatan Pesanan:
				</Text>
				{data.note ? (
					<Box fontSize='sm'>{data.note}</Box>
				) : (
					<Box
						color='gray.400'
						fontSize='sm'
						p='2'
						// w='max-content'
						border='1px solid'
						borderColor='gray.600'
						rounded='md'
					>
						Tidak ada Catatan!
					</Box>
				)}
			</Box>
			<Flex mb='4' justifyContent='space-between' mt='4'>
				<Box>
					<Text fontSize={{ base: 'sm', md: 'xl' }} color='gray.400'>
						Total Pesanan
					</Text>
					<Text fontWeight='bold' fontSize={{ base: 'xl', md: '3xl' }}>
						{formatPrice(getTotal(data.items))}
					</Text>
				</Box>
				<Box>
					<Text fontSize={{ base: 'sm', md: 'xl' }} color='gray.400'>
						Total Pesanan
					</Text>
					<Text
						fontWeight='bold'
						fontSize={{ base: 'xl', md: '3xl' }}
						textAlign='right'
					>
						x{getTotalQty(data.items)}
					</Text>
				</Box>
			</Flex>
		</Box>
	)
}

const AddItem = ({ order, setOrder }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Button onClick={onOpen} size='xs' ml='2'>
				Tambah Item
			</Button>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent maxW='container.md' bg='gray.900' mx='4'>
					<ModalHeader>Tambah Item Pesanan #{order.no}</ModalHeader>
					<ModalCloseButton />
					<ModalBody h='full' maxH='75vh' px='0'>
						<VStack pb='4' spacing='6' alignItems='stretch'>
							<OrderingProvider currentOrder={order}>
								<Box>
									<MenuCategoryProvider>
										<MenusProvider>
											<TabsProvider>
												<MenuTabs isOrdering />
											</TabsProvider>
										</MenusProvider>
									</MenuCategoryProvider>
								</Box>
								<AddItemAction
									onClose={onClose}
									order={order}
									setOrder={setOrder}
								/>
							</OrderingProvider>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

const AddItemAction = ({ onClose, order, setOrder }) => {
	const { currentResto } = useUserResto()
	const [isLoading, setIsLoading] = React.useState(false)
	const { orderItems } = useOrdering()
	const handleClick = async () => {
		setIsLoading(true)
		try {
			const updatedOrder = await OrderApi.updateOrder({
				restoId: currentResto.id,
				order: {
					...order,
					items: orderItems,
				},
			})
			setOrder(updatedOrder)
			setIsLoading(false)
			onClose()
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}
	return (
		<VStack px='4' spacing='2' alignItems='stretch'>
			<Button onClick={handleClick} isLoading={isLoading} size='sm'>
				Ubah Item Pesanan
			</Button>
			<Button onClick={onClose} size='sm' variant='ghost'>
				Kembali
			</Button>
		</VStack>
	)
}

const EditStatus = ({ order, setOrder }) => {
	const [value, setValue] = React.useState(order.status)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { currentResto } = useUserResto()
	const [isLoading, setIsLoading] = React.useState(false)

	const onStatusUpdate = async () => {
		setIsLoading(true)
		try {
			const updatedOrder = await OrderApi.updateOrder({
				restoId: currentResto.id,
				order: {
					...order,
					status: value,
				},
			})
			setOrder(updatedOrder)
			setIsLoading(false)
			onClose()
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	return (
		<>
			<IconButton onClick={onOpen} ml='2' size='xs' icon={<EditIcon />} />
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg='gray.800' mx='4'>
					<ModalHeader>Status Pesanan #{order.no}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack pb='4' spacing='6' alignItems='stretch'>
							<RadioGroup onChange={setValue} value={value}>
								<Stack direction='column'>
									<Radio size='lg' colorScheme='yellow' value='on_progress'>
										Dalam Proses
									</Radio>
									<Radio size='lg' value='completed' colorScheme='green'>
										Selesai
									</Radio>
									<Radio size='lg' value='canceled' colorScheme='red'>
										Batal
									</Radio>
								</Stack>
							</RadioGroup>
							<VStack spacing='2' alignItems='stretch'>
								<Button
									onClick={onStatusUpdate}
									isLoading={isLoading}
									disabled={value === order.status}
									size='sm'
								>
									Ubah Status
								</Button>
								<Button size='sm' variant='ghost'>
									Kembali
								</Button>
							</VStack>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

const PayNow = ({ order, setOrder }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { currentResto } = useUserResto()

	const [isLoading, setIsLoading] = React.useState(false)

	const onPayClick = async ({ payAmount }) => {
		setIsLoading(true)
		try {
			const updatedOrder = await OrderApi.updateOrder({
				restoId: currentResto.id,
				order: {
					...order,
					isPaid: true,
					payAmount: payAmount,
				},
			})
			setOrder(updatedOrder)
			onClose()
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	return (
		<>
			<IconButton onClick={onOpen} ml='2' size='xs' icon={<EditIcon />} />
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg='gray.800' mx='4'>
					<ModalHeader>Invoice Pesanan</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<OrderPaymentCalculator
							order={order}
							onPay={onPayClick}
							onBack={onClose}
							isLoading={isLoading}
							orderTotal={getTotal(order.items)}
							orderItems={order.items}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default withProtectedRoute(Order)
