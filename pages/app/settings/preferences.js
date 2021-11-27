import { Flex, Text } from '@chakra-ui/layout'
import { BackButton } from '../../../components/BackButton'
import { AppPage } from '../../../components/common/AppPage'
import { AppTopbar } from '../../../components/common/AppTopbar'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'

const Profile = () => {
	return (
		<AppPage displayHeader={false}>
			<Flex direction='column' w='100vw' h='100vh'>
				<AppTopbar>
					<Flex w='full' alignItems='center' justifyContent='space-between'>
						<Text fontSize='xl' fontWeight='bold'>
							Pengaturan
						</Text>
						<BackButton href='/app' />
					</Flex>
				</AppTopbar>
			</Flex>
		</AppPage>
	)
}

export default withProtectedRoute(Profile)
