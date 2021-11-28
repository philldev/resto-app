import { Flex, Grid, HStack, Text } from '@chakra-ui/layout'
import * as OrderApi from '../firebase/order'
import { Select } from '@chakra-ui/select'
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js'
import moment from 'moment'
import * as React from 'react'
import { Line } from 'react-chartjs-2'
import { useUserResto } from '../context/Resto'
import { OverviewBox } from './common/OverviewBox'
import StatDisplay from './StatDisplay'
import useQuery from '../hooks/useQuery'
import { getTotal } from '../utils/calculateTotal'
import { formatPrice } from '../utils/formatPrice'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

const getDaysArray = function (start, end) {
	for (
		var arr = [], dt = new Date(start);
		dt <= end;
		dt.setDate(dt.getDate() + 1)
	) {
		arr.push(new Date(dt))
	}
	return arr
}

export const OverviewMonth = () => {
	const [val, setVal] = React.useState(new Date().getMonth() + 1)
	const selectedM = moment(`${new Date().getFullYear()}-${val}`)
	const days = React.useMemo(
		() => getDaysArray(selectedM.toDate(), selectedM.endOf('month').toDate()),
		[selectedM]
	)
	const { currentResto } = useUserResto()
	const { data, isLoading } = useQuery(
		'overview-month',
		async () => {
			try {
				let startDate = selectedM.startOf('month').toDate()
				let endDate = selectedM.endOf('month').toDate()
				const data = await OrderApi.getRangeOfOrders(
					currentResto.id,
					'completed',
					startDate,
					endDate
				)
				return data
			} catch (error) {
				console.log(error)
				throw error
			}
		},
		[val]
	)

	return (
		<OverviewBox mb='4'>
			<Flex justifyContent='space-between' alignItems='flex-start'>
				<Text fontSize='sm' fontWeight='bold' color='gray.300'>
					Overview bulan
				</Text>
				<HStack>
					<Select
						mb='2'
						w='max-content'
						rounded='md'
						size='sm'
						value={val}
						onChange={(e) => setVal(e.target.value)}
					>
						<option value='1'>Januari 2021</option>
						<option value='2'>Febuari 2021</option>
						<option value='3'>Maret 2021</option>
						<option value='4'>April 2021</option>
						<option value='5'>Mei 2021</option>
						<option value='6'>Juni 2021</option>
						<option value='7'>Juli 2021</option>
						<option value='8'>Agustus 2021</option>
						<option value='9'>September 2021</option>
						<option value='10'>Oktober 2021</option>
						<option value='11'>November 2021</option>
						<option value='12'>Desember 2021</option>
					</Select>
				</HStack>
			</Flex>
			{data?.length > 0 && (
				<Line
					data={{
						labels: days.map((i) => i.getDate()),
						datasets: [
							{
								fill: false,
								lineTension: 0.1,
								backgroundColor: 'rgba(75,192,192,0.4)',
								borderColor: 'rgba(75,192,192,1)',
								borderCapStyle: 'butt',
								borderDash: [],
								cubicInterpolationMode: 'monotone',
								borderDashOffset: 0.0,
								borderJoinStyle: 'miter',
								pointBorderColor: 'rgba(75,192,192,1)',
								pointBackgroundColor: '#fff',
								pointBorderWidth: 1,
								pointHoverRadius: 5,
								pointHoverBackgroundColor: 'rgba(75,192,192,1)',
								pointHoverBorderColor: 'rgba(220,220,220,1)',
								pointHoverBorderWidth: 2,
								pointRadius: 1,
								pointHitRadius: 10,
								data: data
									? days.map((d) =>
											data?.reduce(
												(prev, curr) =>
													moment(d).isSame(
														moment(curr.createdAt.toDate()),
														'date'
													)
														? prev + getTotal(curr.items)
														: prev,
												0
											)
									  )
									: [],
							},
						],
					}}
					options={{
						plugins: {
							legend: {
								display: false,
							},
						},
					}}
				/>
			)}
			<Grid mt='2' templateColumns='1fr max-content' gap='2'>
				<StatDisplay
					isLoading={isLoading}
					value={formatPrice(
						data?.reduce((prev, curr) => prev + getTotal(curr.items), 0)
					)}
					label='Penjualan'
				/>
				<StatDisplay
					isLoading={isLoading}
					label='Pesanan'
					value={data?.length}
				/>
			</Grid>
		</OverviewBox>
	)
}
