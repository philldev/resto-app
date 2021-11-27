import { Box, Flex, Grid, Text } from '@chakra-ui/layout'
import { BackButton } from '../../../components/BackButton'
import { AppPage } from '../../../components/common/AppPage'
import { DataDisplay } from '../../../components/DataDisplay'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { useAuth } from '../../../context/auth'

function Account() {
	return (
		<AppPage displayHeader={false}>
			<Flex direction='column' w='100vw' h='100vh'>
				<Flex bg='gray.800' alignItems='center' p='4'>
					<Flex
						maxW='container.md'
						mx='auto'
						justifyContent='space-between'
						w='full'
						alignItems='center'
					>
						<Text fontSize='xl' fontWeight='bold'>
							Akun
						</Text>
						<BackButton href='/app' />
					</Flex>
				</Flex>
				<Box bg='gray.900' flex='1' px='4' py='4'>
					<Box rounded='md' h='full' maxW='container.md' w='full' mx='auto'>
						<UserProfile />
					</Box>
				</Box>
			</Flex>
		</AppPage>
	)
}

const UserProfile = () => {
	const { user } = useAuth()
	return (
		<Grid gap='4' templateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }}>
			<DataDisplay label='Email' data={user.email} />
			<DataDisplay label='Kata Sandi' data={'**********'} />
			<DataDisplay label='Nama' data={user.name} />
			<DataDisplay label='Alamat' data={user.address} />
			{/* <DataDisplay label='Tanggal Lahir' data={user.dob} />
			<DataDisplay label='No Handphone' data={user.dob} /> */}
		</Grid>
	)
}

export default withProtectedRoute(Account)
