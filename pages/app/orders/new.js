import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
	Badge,
	Box,
	Divider,
	Flex,
	Grid,
	HStack,
	Text,
	VStack
} from '@chakra-ui/layout'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/modal'
import {
	Alert,
	AlertIcon,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Textarea
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-wizard-primitive'
import { MenuIcon } from '../../../components/common/icons/MenuIcon'
import { MenuTabs } from '../../../components/MenuTabs/MenuTabs'
import { OrderItemList } from '../../../components/OrderItemsList'
import { OrderPaymentCalculator } from '../../../components/OrderPaymentCalculator'
import { MenuCategoryProvider } from '../../../context/MenuCategory'
import { MenusProvider } from '../../../context/Menus'
import {
	OrderingProvider,
	OrderTypeEnum,
	useOrdering
} from '../../../context/Ordering'
import { useUserResto } from '../../../context/Resto'
import { TabsProvider } from '../../../context/Tabs'
import * as OrderApi from '../../../firebase/order'
import { useIsMdSize } from '../../../hooks/windowSize'
import { getTotal } from '../../../utils/calculateTotal'
import { formatPrice } from '../../../utils/formatPrice'
import { getOrderResolver } from '../../../utils/formSchema/orderSchema'

const NewOrder = () => {
	const { currentResto } = useUserResto()
	if (!currentResto) return null
	return (
		<OrderingProvider>
			<OrderTypeDialog />
			<Flex bg='gray.900' flexDir='column' w='100vw' h='100vh'>
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
		</OrderingProvider>
	)
}

const Topbar = () => {
	const router = useRouter()
	return (
		<Flex borderBottom='1px solid var(--chakra-colors-gray-700)'>
			<Flex
				maxW='container.md'
				w='full'
				mx='auto'
				alignItems='center'
				justifyContent='space-between'
				h='14'
				px='2'
			>
				<Flex alignItems='center' wrap='wrap'>
					<Flex alignItems='center'>
						<MenuIcon mr='2' flex='1' w='6' h='6' />
						<Text fontSize='xl'>Pesanan Baru</Text>
					</Flex>
					<Divider orientation='vertical' mx='1' />
				</Flex>
				<IconButton
					variant='ghost'
					onClick={() => router.back()}
					icon={<ArrowBackIcon w='6' h='6' />}
				/>
			</Flex>
		</Flex>
	)
}

const OrderTypeLabel = () => {
	const { orderType, chooseOrderType } = useOrdering()
	if (!orderType) return null
	return (
		<Flex alignItems='center'>
			{orderType === OrderTypeEnum.DINE_IN && (
				<Badge colorScheme='blue' variant='solid'>
					Makan Di Tempat
				</Badge>
			)}
			{orderType === OrderTypeEnum.TAKE_AWAY && (
				<Badge colorScheme='blue' variant='solid'>
					{' '}
					BAWA PULANG
				</Badge>
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
	const router = useRouter()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { orderType, chooseOrderType } = useOrdering()
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
					<ModalCloseButton onClick={() => router.push('/app/orders')} />
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
	const { getTotal, getTotalQty } = useOrdering()
	return (
		<Box
			mx='auto'
			maxW='container.md'
			w='full'
			p='4'
			bg='gray.800'
			fontSize='sm'
		>
			<VStack alignItems='stretch'>
				<Flex justifyContent='space-between' w='full'>
					<Text>Total : {formatPrice(getTotal())}</Text>
					<Text>Total Menu : {getTotalQty()}</Text>
				</Flex>
				<OpenOrderDetailBtn />
			</VStack>
		</Box>
	)
}

const OpenOrderDetailBtn = () => {
	const { orderItems, order } = useOrdering()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = React.useRef()
	const isMdSize = useIsMdSize()
	return (
		<>
			<Button disabled={orderItems.length === 0} ref={btnRef} onClick={onOpen}>
				Lihat Detail Pesanan
			</Button>
			<Drawer
				isOpen={order ? true : isOpen}
				placement={isMdSize ? 'right' : 'bottom'}
				onClose={order ? () => {} : onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent
					maxW={isMdSize ? '400px' : undefined}
					maxH={isMdSize ? '100vh' : '80vh'}
					bg='gray.800'
				>
					{!order && <DrawerCloseButton />}
					<DrawerHeader px='2' d='flex' flexDir='column'>
						<Text>Detail Pesanan</Text> <OrderTypeLabel />
					</DrawerHeader>
					<DrawerBody px='2'>
						<NewOrderDetail onClose={onClose} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

const NewOrderDetail = ({ onClose }) => {
	const { getStep, nextStep, previousStep } = useWizard()
	const steps = [
		NewOrderDetailForm,
		NewOrderPayment,
		NewOrderPayNow,
		PaySuccess,
	]
	return steps.map(
		(Step, index) =>
			getStep().isActive && (
				<Step
					key={index}
					goNext={nextStep}
					goBack={previousStep}
					{...{ onClose }}
				/>
			)
	)
}

const NewOrderPayment = ({ goNext }) => {
	const { order, getTotal } = useOrdering()
	return (
		<VStack spacing='4' pb='4' alignItems='stretch'>
			<Alert status='success'>
				<AlertIcon />
				Pesanan sukses dibuat!
			</Alert>
			<OrderCard total={getTotal()} order={order} />
			<FormControl w='full'>
				<FormLabel>Pembayaran*</FormLabel>
				<VStack alignItems='stretch'>
					<Button onClick={goNext} variant='outline'>
						Bayar Sekarang
					</Button>
					<Link passHref href='/app/orders'>
						<Button variant='outline'>Bayar Nanti</Button>
					</Link>
				</VStack>
			</FormControl>
		</VStack>
	)
}

const OrderCard = ({ order, total }) => {
	return (
		<Flex
			flexDir='column'
			pos='relative'
			borderRadius='xl'
			border='1px solid'
			borderColor='gray.700'
			overflow='hidden'
		>
			<Box p='2' bg='gray.900' w='100%'>
				<HStack mb='1' w='full' alignItems='center'>
					<Text fontSize='lg' fontWeight='bold'>
						Order #{order.no}
					</Text>
					<Divider orientation='vertical' h='6' mx='2' />
					<Text fontSize='sm' color='gray.300'>
						Meja #{order.table}
					</Text>
					<Divider orientation='vertical' h='6' mx='2' />
					<Text fontSize='sm' color='gray.300'>
						{order.customer}
					</Text>
				</HStack>
				<HStack>
					<Badge colorScheme='yellow'>On Progress</Badge>
					<Badge colorScheme='green' opacity='.5'>
						Completed
					</Badge>
					<Badge colorScheme='red' opacity='.5'>
						Canceled
					</Badge>
				</HStack>
			</Box>

			<Flex p='2' flexDir='column' bg='gray.900' w='100%'>
				<Text mb='2' fontSize='lg' fontWeight='bold'>
					Total Bayar : {formatPrice(total)}
				</Text>
				<Link passHref href={`/app/orders/${order.id}`}>
					<Button size='sm'>Lihat Detail</Button>
				</Link>
			</Flex>
		</Flex>
	)
}

const PaySuccess = () => {
	const { order } = useOrdering()
	return (
		<VStack spacing='12' pb='4' alignItems='stretch'>
			<VStack alignItems='stretch'>
				<Alert status='success'>
					<AlertIcon />
					Pesanan telah dibayar
				</Alert>
				<OrderCard order={order} total={getTotal(order.items)} />
			</VStack>
			<Link passHref href='/app/orders'>
				<Button as='a' color='gray.100'>
					Kembali ke list Order
				</Button>
			</Link>
		</VStack>
	)
}

const NewOrderPayNow = ({ goBack, goNext }) => {
	const { currentResto } = useUserResto()
	const { getTotal, orderItems, setOrder, order } = useOrdering()
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
			goNext()
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	return (
		<OrderPaymentCalculator
			onPay={onPayClick}
			orderItems={orderItems}
			orderTotal={getTotal()}
			isLoading={isLoading}
			order={order}
			onBack={goBack}
		/>
	)
}

const NewOrderDetailForm = ({ onClose, goNext }) => {
	const { orderItems, orderType, setOrder, order } = useOrdering()
	const { currentResto } = useUserResto()
	const {
		register,
		setValue,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: order
			? {
					costumer: order.costumer,
					notes: order.notes,
					table: order.table,
			  }
			: undefined,
		resolver: getOrderResolver(orderType),
	})

	const [isLoading, setIsLoading] = React.useState()
	const onSubmit = async (data) => {
		setIsLoading(true)
		try {
			const order = {
				...data,
				items: orderItems,
				type: orderType,
				status: 'on_progress',
			}
			const newOrder = await OrderApi.createOrder({
				restoId: currentResto.id,
				order,
			})
			setOrder(newOrder)
			goNext()
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	return (
		<VStack
			as='form'
			onSubmit={handleSubmit(onSubmit)}
			maxW='container.md'
			mx='auto'
			alignItems='stretch'
			spacing='6'
			pb='4'
		>
			<VStack alignItems='stretch' spacing='4' flexDir='column' pb='4'>
				<FormControl w='full'>
					<FormLabel>Nama Kostumer*</FormLabel>
					<Input
						w='full'
						bg='gray.700'
						border='none'
						placeholder='Masukan nama kustomer'
						{...register('customer')}
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'>
						{errors.customer?.message}
					</FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel mb='1'>Item Pesanan</FormLabel>
					<OrderItemList orderItems={orderItems} />
				</FormControl>
				<FormControl>
					<FormLabel>Catatan Pesanan</FormLabel>
					<Textarea {...register('notes')} placeholder='Catatan' />
					<FormHelperText fontSize='sm' color='red.400' mt='2'>
						{errors.notes?.message}
					</FormHelperText>
				</FormControl>
				{orderType === OrderTypeEnum.DINE_IN && (
					<FormControl>
						<FormLabel>Meja Pesanan</FormLabel>
						<Grid templateColumns='1fr 1fr 1fr' gap='1'>
							{new Array(12).fill(0).map((_, index) => (
								<Button
									colorScheme={watch('table') === index + 1 ? 'blue' : 'gray'}
									variant={watch('table') === index + 1 ? 'solid' : 'outline'}
									onClick={() =>
										watch('table') === index + 1
											? setValue('table', -1)
											: setValue('table', index + 1, { shouldValidate: true })
									}
									key={index}
								>
									{index + 1}
								</Button>
							))}
						</Grid>
						<FormHelperText fontSize='sm' color='red.400' mt='2'>
							{errors.table?.message}
						</FormHelperText>
					</FormControl>
				)}
			</VStack>
			<VStack alignItems='stretch'>
				<Button colorScheme='teal' isLoading={isLoading} type='submit'>
					Lanjut
				</Button>
				<Button isLoading={isLoading} onClick={onClose}>
					Kembali ke Menu
				</Button>
			</VStack>
		</VStack>
	)
}

export default NewOrder
