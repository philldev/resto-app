import { Flex, Text } from '@chakra-ui/layout'
import { BackButton } from '../../../components/BackButton'
import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'

const Profile = () => {
	return (
		<AppPage displayHeader={false}>
			<Flex bg='gray.900' direction='column' w='100vw' h='100vh'>
				<Flex borderBottom='1px solid var(--chakra-colors-gray-700)'>
					<Flex
						maxW='container.md'
						w='full'
						mx='auto'
						alignItems='center'
						justifyContent='space-between'
						h='14'
						px='2'
					>
						<Text fontSize='xl' fontWeight='bold'>
							Pengaturan Aplikasi
						</Text>
						<BackButton href='/app' />
					</Flex>
				</Flex>
			</Flex>
		</AppPage>
	)
}

export default withProtectedRoute(Profile)
