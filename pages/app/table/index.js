import { Divider, Flex, Text } from '@chakra-ui/layout'
import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { useUserResto } from '../../../context/Resto'
import Image from 'next/image'
import { More } from '../../../components/More'
import { AppTopbar } from '../../../components/common/AppTopbar'

const Table = () => {
	return (
		<AppPage displayHeader={false}>
			<Flex w='full' h='full' flexDir='column'>
				<Topbar />
			</Flex>
		</AppPage>
	)
}

Table.title = 'Meja'

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
					Meja
				</Text>
			</Flex>
			<More />
		</AppTopbar>
	)
}

export default withProtectedRoute(Table)
