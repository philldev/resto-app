import { Flex, Text } from '@chakra-ui/layout'
import { Timestamp } from '@firebase/firestore'
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
import Image from 'next/image'
import * as React from 'react'
import { AppPage } from '../../components/common/AppPage'
import { OverviewBox } from '../../components/common/OverviewBox'
import withProtectedRoute from '../../components/hoc/withProtectedRoute'
import { OrderCard } from '../../components/OrderCard'
import { OverviewMonth } from '../../components/OverviewMonth'
import { OverviewToday } from '../../components/OverviewToday'
import { useUserResto } from '../../context/Resto'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

function Home() {
	const { currentResto } = useUserResto()
	if (!currentResto) return null
	return (
		<AppPage displayHeader={false}>
			<Flex flexDir='column' flex='1'>
				<Flex
					maxW='container.md'
					mx='auto'
					w='full'
					alignItems='center'
					p='4'
					fontSize='xl'
				>
					<Flex alignItems='center'>
						<Image width='32px' height='32px' alt='logo' src='/logo.png' />
						<Text fontSize='lg' ml='2'>
							Home
						</Text>
					</Flex>
				</Flex>
				<Flex overflowY='auto' flexDir='column' flex='1' bg='gray.900'>
					<Flex
						maxWidth='container.md'
						w='full'
						mx='auto'
						px='2'
						py='4'
						direction='column'
					>
						<OverviewToday />
						<OverviewMonth />
						<OverviewBox>
							<Text fontSize='sm' fontWeight='bold' color='gray.300' mb='2'>
								Pesanan terakhir
							</Text>
							<OrderCard
								order={{
									notes: 'asd',
									table: 1,
									updatedAt: {
										seconds: 1637645647,
										nanoseconds: 376000000,
									},
									id: 'p2SGrSBbi2CLTFYkUSoyh',
									payAmount: 10000,
									status: 'on_progress',
									items: [
										{
											categoryId: 'Do1PnbgmtguwI5WKqE786',
											price: '234',
											id: 'RkrjT6yQUp_H0Jxha5n9r',
											qty: 1,
											name: 'janji jiwa',
										},
										{
											name: 'mie',
											qty: 1,
											price: '2000',
											id: 'LnQeXLRqU-8xHJxAm-1VJ',
											categoryId: 'Do1PnbgmtguwI5WKqE786',
										},
									],
									isPaid: true,
									no: 0,
									costumer: 'Deddy',
									type: 'DINE_IN',
									createdAt: Timestamp.now(),
								}}
							/>
						</OverviewBox>
					</Flex>
				</Flex>
			</Flex>
		</AppPage>
	)
}

export default withProtectedRoute(Home)
