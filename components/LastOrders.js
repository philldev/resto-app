import { Button } from '@chakra-ui/button'
import { Grid, HStack, Text } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/react'
import Link from 'next/link'
import { useUserResto } from '../context/Resto'
import * as OrderApi from '../firebase/order'
import useQuery from '../hooks/useQuery'
import { OverviewBox } from './common/OverviewBox'
import { OrderCard } from './OrderCard'

export const LastOrders = () => {
	const { currentResto } = useUserResto()
	const { data, isLoading } = useQuery('overview-today', async () => {
		try {
			const data = await OrderApi.getOrders(currentResto.id, 'on_progress', 2)
			return data
		} catch (error) {
			throw error
		}
	})
	return (
		<OverviewBox>
			<Text fontSize='sm' fontWeight='bold' color='gray.300' mb='2'>
				Pesanan terakhir
			</Text>
			<Grid mb='2' gap='2' templateColumns={{ md: '1fr 1fr' }}>
				{isLoading ? (
					<Skeleton h='60' />
				) : (
					data?.map((o, index) => <OrderCard order={o} key={index} />)
				)}
			</Grid>
			<HStack>
				<Link href='/app/orders/new' passHref>
					<Button size='sm' variant='outline'>
						+ Pesanan Baru
					</Button>
				</Link>
				<Link passHref href='/app/orders'>
					<Button size='sm' variant='outline'>
						Lihat Semua
					</Button>
				</Link>
			</HStack>
		</OverviewBox>
	)
}
