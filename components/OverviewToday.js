import { Flex, Grid, Text } from '@chakra-ui/layout'
import moment from 'moment'
import { OverviewBox } from './common/OverviewBox'
import StatDisplay from './StatDisplay'

export const OverviewToday = () => {
	return (
		<OverviewBox mb='4'>
			<Flex justifyContent='space-between' h='8'>
				<Text fontSize='sm' fontWeight='bold' color='gray.300' mb='2'>
					Overview Hari ini
				</Text>
				<Text fontSize='sm'>
					<strong>{moment().format('dddd/MM/yy')}</strong>
				</Text>
			</Flex>
			<Grid templateColumns='1fr max-content' gap='2'>
				<StatDisplay label='Penjualan' value='Rp 10,000,000.00' />
				<StatDisplay label='Pesanan' value='x 20' />
			</Grid>
		</OverviewBox>
	)
}
