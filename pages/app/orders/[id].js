import { Button, IconButton } from '@chakra-ui/button'
import { ArrowBackIcon, CalendarIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Divider, Flex, Grid, HStack, Text } from '@chakra-ui/layout'
import moment from 'moment'
import { useRouter } from 'next/router'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { OrderItemList } from '../../../components/OrderItemsList'
import { useUserResto } from '../../../context/Resto'
import * as OrderApi from '../../../firebase/order'
import useQuery from '../../../hooks/useQuery'
import { getTotal, getTotalQty } from '../../../utils/calculateTotal'
import { formatPrice } from '../../../utils/formatPrice'

function Order() {
	return (
		<Flex flexDir='column' w='100vw' h='100vh' overflow='hidden'>
			<Topbar />
			<Flex alignItems='center' flex='1' flexDir='column'>
				<OrderDetail />
			</Flex>
			<Flex flexDir='column'></Flex>
		</Flex>
	)
}

const Topbar = () => {
	const router = useRouter()
	return (
		<Flex
			alignItems='center'
			p='4'
			justifyContent='space-between'
			borderBottom='1px solid'
			borderBottomColor='gray.700'
		>
			<Text fontWeight='bold' fontSize='xl'>
				Detail Pesanan
			</Text>
			<IconButton
				variant='ghost'
				onClick={() => router.back()}
				icon={<ArrowBackIcon w='6' h='6' />}
			/>
		</Flex>
	)
}

const OrderDetail = () => {
	const router = useRouter()
	const { currentResto } = useUserResto()
	const { isLoading, isError, data } = useQuery(
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
		<Box alignItems='stretch' p='4' w='100%' maxW='container.md'>
			<Flex alignItems='center' mb='2' justifyContent='space-between'>
				<HStack alignItems='center'>
					<Text fontSize='lg' fontWeight='bold'>
						Order #{data.no}
					</Text>
					<Divider orientation='vertical' h='6' mx='2' />
					<Text fontSize='sm' color='gray.300'>
						Meja #{data.table}
					</Text>
					<Divider orientation='vertical' h='6' mx='2' />
					<Text fontSize='sm' color='gray.300'>
						{data.customer}
					</Text>
				</HStack>
			</Flex>

			<Grid mb='4' gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} gap='4'>
				<Box flex='1'>
					<Flex alignItems='center'>
						<Text fontSize='sm' color='gray.200'>
							Item Pesanan :
						</Text>
						<Button size='xs' ml='2'>
							Tambah Item
						</Button>
					</Flex>
					<OrderItemList orderItems={data.items} />
				</Box>
				<Grid
					autoRows='max-content'
					gridTemplateColumns={{ base: '1fr 1fr', md: '1fr 1fr' }}
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
							<IconButton ml='2' size='xs' icon={<EditIcon />} />
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
						<Flex>
							{data.isPaid ? (
								<Flex alignItems='center'>
									<Box w='2' h='2' rounded='full' mr='2' bg='green.200' />
									<Text>Sudah di Bayar</Text>
								</Flex>
							) : (
								<>
									<Flex alignItems='center'>
										<Box w='2' h='2' rounded='full' mr='2' bg='yellow.200' />
										<Text>Belum bayar</Text>
									</Flex>
									<IconButton ml='2' size='xs' icon={<EditIcon />} />
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
					<Text fontSize='xl' color='gray.400'>
						Total Pesanan
					</Text>
					<Text fontWeight='bold' fontSize='3xl'>
						{formatPrice(getTotal(data.items))}
					</Text>
				</Box>
				<Box>
					<Text fontSize='xl' color='gray.400'>
						Total Pesanan
					</Text>
					<Text fontWeight='bold' fontSize='3xl' textAlign='right'>
						x{getTotalQty(data.items)}
					</Text>
				</Box>
			</Flex>
		</Box>
	)
}

export default withProtectedRoute(Order)
