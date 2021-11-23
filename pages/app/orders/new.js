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
import {
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
	Textarea,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import { useWizard } from 'react-wizard-primitive'
import { EyeIcon } from '../../../components/common/icons/EyeIcon'
import { EyeOffIcon } from '../../../components/common/icons/EyeIcon copy'
import { MenuIcon } from '../../../components/common/icons/MenuIcon'
import { MenuTabs } from '../../../components/MenuTabs/MenuTabs'
import { OrderItemsTable } from '../../../components/OrderItemsTable'
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
import { formatPrice } from '../../../utils/formatPrice'
import { getOrderResolver } from '../../../utils/formSchema/orderSchema'
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
					<Text>Total : {formatPrice(getTotal())}</Text>
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
					maxH={isMdSize ? '100vh' : '80vh'}
					bg='gray.800'
				>
					<DrawerCloseButton />
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
	const steps = [NewOrderDetailForm, NewOrderPayment, NewOrderPayNow]
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

const NewOrderPayment = ({ goNext, goBack }) => {
	return (
		<VStack spacing='4' pb='4' alignItems='stretch'>
			<FormControl w='full'>
				<FormLabel>Pembayaran*</FormLabel>
				<VStack alignItems='stretch'>
					<Button onClick={goNext} variant='outline'>
						Bayar Sekarang
					</Button>
					<Button variant='outline'>Bayar Nanti</Button>
				</VStack>
			</FormControl>
			<Button onClick={goBack}>Kembali</Button>
		</VStack>
	)
}

const NewOrderPayNow = ({ goBack }) => {
	const { getTotal, orderItems } = useNewOrder()
	const [showOrderItems, setShowOrderItems] = React.useState(false)

	const [payAmount, setPayAmount] = React.useState('')
	const [payAmountVal, setPayAmountVal] = React.useState(0)

	const changeAmount = payAmountVal - getTotal()
	const isMoreOrEqual = changeAmount >= 0

	const exampleAmount = [
		10000, 20000, 50000, 100000, 
		// 150000, 200000, 250000, 500000,
	]

	React.useEffect(() => {
		setPayAmount(payAmountVal)
	}, [payAmountVal])

	console.log('render++')

	return (
		<VStack spacing='12' pb='4' alignItems='stretch'>
			<VStack spacing='2' alignItems='stretch'>
				<FormControl>
					<FormLabel>Item Pesanan</FormLabel>
					<Button
						mb='2'
						onClick={() => setShowOrderItems((p) => !p)}
						leftIcon={
							!showOrderItems ? (
								<EyeIcon w='5' h='5' />
							) : (
								<EyeOffIcon w='5' h='5' />
							)
						}
						size='sm'
					>
						{!showOrderItems ? 'Lihat' : 'Sembunyikan'} Item Pesanan
					</Button>
					{showOrderItems && <OrderItemsTable orderItems={orderItems} />}
				</FormControl>
				<FormControl w='100%' overflowX='hidden'>
					<FormLabel mb='1'>Bayar</FormLabel>
					<NumberFormat
						customInput={Input}
						value={payAmount}
						onChange={(e) => {
							e.persist()
							setPayAmount(e.target.value)
						}}
						prefix={'Rp '}
						thousandSeparator='.'
						decimalSeparator=','
						textAlign='center'
						fontWeight='bold'
						fontSize='xl'
						placeholder='Jumlah Bayar'
						mb='2'
						suffix=',00'
						w='full'
						bg='gray.700'
						border='none'
						onValueChange={(values) => {
							setPayAmountVal(parseInt(values.value))
						}}
					/>
					<HStack>
						{exampleAmount.map((i, index) => (
							<Button
								onClick={() => setPayAmountVal((v) => v + i)}
								key={index}
								size='xs'
							>
								+ {i / 1000}k
							</Button>
						))}
					</HStack>
				</FormControl>
				<FormControl>
					<FormLabel mb='1'>Total Bayar</FormLabel>
					<Box
						p='1'
						textAlign='center'
						rounded='md'
						bg={isMoreOrEqual ? 'green.900' : 'gray.900'}
						transition='all .2s ease-in-out'
						fontWeight='bold'
						fontSize='xl'
					>
						{formatPrice(getTotal())}
					</Box>
				</FormControl>
				<FormControl>
					<FormLabel mb='1'>Total Kembalian</FormLabel>
					<Box
						p='1'
						textAlign='center'
						rounded='md'
						bg={isMoreOrEqual ? 'green.900' : 'red.900'}
						fontWeight='bold'
						fontSize='xl'
						transition='all .2s ease-in-out'
					>
						{formatPrice(changeAmount)}
					</Box>
				</FormControl>
			</VStack>
			<VStack spacing='2' alignItems='stretch'>
				<Button disabled={!isMoreOrEqual} colorScheme='green'>
					Bayar
				</Button>
				<Button onClick={goBack}>Kembali</Button>
			</VStack>
		</VStack>
	)
}

const NewOrderDetailForm = ({ onClose, goNext }) => {
	const { orderItems, orderType, setOrder, order } = useNewOrder()
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
		try {
			const order = {
				...data,
				items: orderItems,
				type: orderType,
			}
			setOrder(order)
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
						{...register('costumer')}
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'>
						{errors.costumer?.message}
					</FormHelperText>
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
										<Text>{formatPrice(item.price)}</Text>
									</Box>
									<Text p='1'>x {item.qty}</Text>
								</Flex>
							</Flex>
						))}
					</VStack>
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
