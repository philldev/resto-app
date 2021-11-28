import { Avatar } from '@chakra-ui/avatar'
import { Badge, Box, Divider, Flex, Grid, Text } from '@chakra-ui/layout'
import moment from 'moment'
import Link from 'next/link'
import * as React from 'react'
import { getTotal, getTotalQty } from '../utils/calculateTotal'
import { formatPrice } from '../utils/formatPrice'
import { ClockIcon } from './common/icons/ClockIcon'

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
				<Box w='100%' mb='1'>
					<Flex justifyContent='space-between'>
						<Flex w='full' alignItems='center' justifyContent='space-between'>
							<Flex alignItems='center'>
								<Text fontSize='lg' fontWeight='bold'>
									Order #{order.no}
								</Text>
								<Divider orientation='vertical' h='6' mx='2' />
								<Text textAlign='right' fontSize='xs' color='gray.400'>
									{moment(order.createdAt.toDate()).format('LL')}
								</Text>
							</Flex>
							<Flex alignItems='center'>
								{order.status === 'on_progress' ? (
									<ClockIcon w='5' h='5' />
								) : order.status === 'completed' ? (
									<Badge colorScheme='green'>Selesai</Badge>
								) : (
									<Badge colorScheme='red'>Dibatalkan</Badge>
								)}
							</Flex>
						</Flex>
					</Flex>
				</Box>
				<Grid templateColumns='auto 1fr' gap='2' mb='2' alignItems='center'>
					<Avatar rounded='md' name={order.items[0].name} w='32px' h='32px' />
					<Text fontSize='xs' noOfLines={2}>
						{order.items.map((i, index) => (
							<Text as='span' display='inline-block' mr='2' key={index}>
								<strong>{i.name}</strong> x{i.qty}{' '}
							</Text>
						))}
					</Text>
				</Grid>
				<Flex flexDir='column' w='100%'>
					<Flex justifyContent='space-between' fontSize='sm'>
						<Text>Total Bayar : {formatPrice(getTotal(order.items))}</Text>
						<Text textAlign='right'>Item : {getTotalQty(order.items)}</Text>
					</Flex>
				</Flex>
			</Flex>
		</Link>
	)
}
