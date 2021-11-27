import { Badge, Box, Divider, Flex, Text } from '@chakra-ui/layout'
import moment from 'moment'
import Link from 'next/link'
import { getTotal, getTotalQty } from '../utils/calculateTotal'
import { formatPrice } from '../utils/formatPrice'

export const OrderCard = ({ order }) => {
	return (
		<Link passHref href={`/app/orders/${order.id}`}>
			<Flex
				flexDir='column'
				pos='relative'
				borderRadius='md'
				overflow='hidden'
				border='1px solid'
				borderColor='gray.700'
				p='2'
				color='gray.200'
				cursor='pointer'
				_hover={{ bg: 'gray.800' }}
			>
				<Box w='100%'>
					<Flex mb='1' justifyContent='space-between'>
						<Flex w='full' alignItems='center' justifyContent='space-between'>
							<Flex alignItems='center'>
								<Text fontSize='lg' fontWeight='bold'>
									Order #{order.no}
								</Text>
								<Divider orientation='vertical' h='6' mx='2' />
								{order.status === 'on_progress' ? (
									<Badge colorScheme='yellow'>Dalam Proses</Badge>
								) : order.status === 'completed' ? (
									<Badge colorScheme='green'>Selesai</Badge>
								) : (
									<Badge colorScheme='red'>Dibatalkan</Badge>
								)}
							</Flex>
							<Flex alignItems='center'>
								<Text textAlign='right' fontSize='xs' color='gray.400'>
									{moment(order.createdAt.toDate()).format('d/mm/yy')}
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Box>
				<Flex flexDir='column' w='100%'>
					<Flex justifyContent='space-between' fontSize='sm'>
						<Text>Total Bayar : {formatPrice(getTotal(order.items))}</Text>
						<Text textAlign='right'>
							Item : {getTotalQty(order.items)}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Link>
	)
}
