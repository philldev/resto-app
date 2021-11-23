import { IconButton } from '@chakra-ui/button'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Badge, Box, Divider, Flex, HStack, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'

function Order() {
	const router = useRouter()
	return (
		<Flex flexDir='column' w='100vw' h='100vh' overflow='hidden'>
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
			<Flex alignItems='center' flex='1' flexDir='column'>
				<Box pt='4' w='100%' maxW='container.md'>
					<Flex mb='2' justifyContent='space-between'>
						<HStack alignItems='center'>
							<Text fontSize='lg' fontWeight='bold'>
								Order #1
							</Text>
							<Divider orientation='vertical' h='6' mx='2' />
							<Text fontSize='sm' color='gray.300'>
								Meja #2
							</Text>
							<Divider orientation='vertical' h='6' mx='2' />
							<Text fontSize='sm' color='gray.300'>
								Deddy Wolley
							</Text>
						</HStack>
						<Text textAlign='right' fontSize='10px' color='gray.400'>
							monday
						</Text>
					</Flex>
					<OrderTags orderStatus='on_progress' orderType='TAKE_AWAY' />
				</Box>
			</Flex>
			<Flex flexDir='column'></Flex>
		</Flex>
	)
}

const OrderTags = ({ orderStatus, isPaid, orderType }) => {
	return (
		<HStack overflowX='auto' pb='2'>
			{orderStatus === 'on_progress' ? (
				<Badge colorScheme='yellow'>Dalam Proses</Badge>
			) : orderStatus === 'completed' ? (
				<Badge colorScheme='green'>Selesai</Badge>
			) : (
				<Badge colorScheme='red'>Dibatalkan</Badge>
			)}
			<Divider h='5' orientation='vertical' />
			{isPaid ? (
				<Badge colorScheme='green'>Sudah di Bayar</Badge>
			) : (
				<Badge colorScheme='yellow'>Belum bayar</Badge>
			)}
			<Divider h='5' orientation='vertical' />
			{orderType === 'DINE_IN' ? (
				<Badge colorScheme='blue'>Makan di tempat</Badge>
			) : (
				<Badge colorScheme='blue'>Bawa pulang</Badge>
			)}
		</HStack>
	)
}

export default withProtectedRoute(Order)
