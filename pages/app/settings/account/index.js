import { Box, Flex, Grid, Text } from '@chakra-ui/layout'
import { BackButton } from '../../../../components/BackButton'
import { AppPage } from '../../../../components/common/AppPage'
import { DataDisplay } from '../../../../components/DataDisplay'
import withProtectedRoute from '../../../../components/hoc/withProtectedRoute'
import { useAuth } from '../../../../context/auth'

const Account = () => {
	return (
		<AppPage displayHeader={false}>
			<Flex bg='gray.900' direction='column' w='100vw' h='100vh'>
				<Flex borderBottom='1px solid var(--chakra-colors-gray-700)'>
					<Flex
						maxW='375px'
						w='full'
						mx='auto'
						alignItems='center'
						justifyContent='space-between'
						h='14'
						px='2'
					>
						<Text fontSize='xl' fontWeight='bold'>
							Akun
						</Text>
						<BackButton href='/app' />
					</Flex>
				</Flex>
				<Box flex='1' px='4' py='4'>
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
		<Grid
			gap='4'
			templateColumns={'1fr'}
			maxW='375px'
			w='full'
			border='1px solid var(--chakra-colors-gray-700)'
			p='4'
			mx='auto'
			// templateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }}
		>
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
