import { Flex, Text } from '@chakra-ui/layout'
import Image from 'next/image'
import * as React from 'react'
import { AppPage } from '../../components/common/AppPage'
import { AppTopbar } from '../../components/common/AppTopbar'
import withProtectedRoute from '../../components/hoc/withProtectedRoute'
import { LastOrders } from '../../components/LastOrders'
import { More } from '../../components/More'
import { OverviewMonth } from '../../components/OverviewMonth'
import { OverviewToday } from '../../components/OverviewToday'
import { useUserResto } from '../../context/Resto'

const Home = () => {
	const { currentResto } = useUserResto()
	if (!currentResto) return null
	return (
		<AppPage displayHeader={false}>
			<Flex flexDir='column' flex='1'>
				<AppTopbar>
					<Flex alignItems='center'>
						<Image width='32px' height='32px' alt='logo' src='/logo.png' />
						<Text fontWeight='bold' fontSize='lg' ml='2'>
							Home
						</Text>
					</Flex>
					<More />
				</AppTopbar>
				<Flex overflowY='auto' flexDir='column' flex='1'>
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
						<LastOrders />
					</Flex>
				</Flex>
			</Flex>
		</AppPage>
	)
}

Home.title = 'Home'

export default withProtectedRoute(Home)
