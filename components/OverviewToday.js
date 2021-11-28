import { Flex, Grid, Text } from '@chakra-ui/layout'
import moment from 'moment'
import { useUserResto } from '../context/Resto'
import * as OrderApi from '../firebase/order'
import useQuery from '../hooks/useQuery'
import { getTotal } from '../utils/calculateTotal'
import { formatPrice } from '../utils/formatPrice'
import { OverviewBox } from './common/OverviewBox'
import StatDisplay from './StatDisplay'


export const OverviewToday = () => {
	const { currentResto } = useUserResto()
	const { data, isLoading } = useQuery('overview-today', async () => {
		try {
			let startDate = moment().set('hour', 0).toDate()
			let endDate = moment().set('hour', 24).toDate()
			const data = await OrderApi.getRangeOfOrders(
				currentResto.id,
				'completed',
				startDate,
				endDate
			)
			return data
		} catch (error) {
			throw error
		}
	})

	return (
		<OverviewBox mb='4'>
			<Flex justifyContent='space-between' h='8'>
				<Text fontSize='sm' fontWeight='bold' color='gray.300' mb='2'>
					Overview Hari ini
				</Text>
				<Text fontSize='sm'>
					<strong>{moment().format('LL')}</strong>
				</Text>
			</Flex>
			<Grid templateColumns='1fr max-content' gap='2'>
				<StatDisplay
					isLoading={isLoading}
					label='Penjualan'
					value={formatPrice(
						data?.reduce((prev, curr) => prev + getTotal(curr.items), 0)
					)}
				/>
				<StatDisplay
					isLoading={isLoading}
					label='Pesanan'
					value={`x ${data?.length}`}
				/>
			</Grid>
		</OverviewBox>
	)
}
