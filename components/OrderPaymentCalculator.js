import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import moment from 'moment'
import * as React from 'react'
import NumberFormat from 'react-number-format'
import { formatPrice } from '../utils/formatPrice'
import { EyeIcon } from './common/icons/EyeIcon'
import { EyeOffIcon } from './common/icons/EyeOff'
import { OrderItemsTable } from './OrderItemsTable'

export const OrderPaymentCalculator = ({
	onPay,
	onBack,
	isLoading,
	orderTotal,
	orderItems,
	order,
}) => {
	const [showOrderItems, setShowOrderItems] = React.useState(false)

	const [payAmount, setPayAmount] = React.useState('')
	const [payAmountVal, setPayAmountVal] = React.useState(0)

	const changeAmount = payAmountVal - orderTotal
	const isMoreOrEqual = changeAmount >= 0

	const exampleAmount = [10000, 20000, 50000, 100000]

	const onPayClick = async () => {
		if (isMoreOrEqual) {
			onPay({ payAmount: payAmountVal })
		}
	}

	React.useEffect(() => {
		setPayAmount(payAmountVal)
	}, [payAmountVal])

	return (
		<VStack spacing='12' pb='4' alignItems='stretch'>
			<VStack spacing='3' alignItems='stretch'>
				<FormControl>
					<FormLabel mb='1'>Tanggal Pesanan</FormLabel>
					<Text>{moment(order.createdAt.toDate()).format('LL')}</Text>
				</FormControl>
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
						{formatPrice(orderTotal)}
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
				<Button
					disabled={!isMoreOrEqual}
					isLoading={isLoading}
					onClick={onPayClick}
					colorScheme='green'
				>
					Bayar
				</Button>
				<Button onClick={onBack} isLoading={isLoading}>
					Kembali
				</Button>
			</VStack>
		</VStack>
	)
}
