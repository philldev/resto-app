import { Divider, Flex, Text } from '@chakra-ui/layout'
import Image from 'next/image'
import { AppPage } from '../../../components/common/AppPage'
import { AppTopbar } from '../../../components/common/AppTopbar'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { More } from '../../../components/More'
import { useUserResto } from '../../../context/Resto'

const Transactions = () => {
	return (
		<AppPage displayHeader={false}>
			<Flex w='full' flexDir='column'>
				<Topbar />
			</Flex>
		</AppPage>
	)
}

const Topbar = () => {
	const { currentResto } = useUserResto()
	return (
		<AppTopbar>
			<Flex alignItems='center'>
				<Image width='32px' height='32px' alt='logo' src='/logo.png' />
				<Text fontSize='lg' ml='2'>
					{currentResto?.name}
				</Text>
				<Divider h='24px' orientation='vertical' mx='2' />
				<Text fontSize='lg' fontWeight='bold'>
					Transaksi
				</Text>
			</Flex>
			<More />
		</AppTopbar>
	)
}

Transactions.title = 'Transaksi'

export default withProtectedRoute(Transactions)
