import { Button } from '@chakra-ui/button'
import { ChevronLeftIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { AppPage } from '../../../components/common/AppPage'
import { HomeIcon } from '../../../components/common/icons/HomeIcon'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { RestoForm } from '../../../components/RestoForm'
import { useUserResto } from '../../../context/Resto'

function Restaurant() {
	const { currentResto } = useUserResto()
	return (
		<AppPage displayHeader={false}>
			<Flex flexDir='column' flex='1'>
				<Flex alignItems='center' p='4' fontSize='xl'>
					<Flex alignItems='center'>
						<HomeIcon w='6' h='6' mr='2' />
						<Text>Resto</Text>
					</Flex>
				</Flex>
				<Flex flexDir='column' flex='1' bg='gray.900'>
					<Flex flexDir='column' w='full' p='4'>
						<Flex
							flexDir='column'
							p='4'
							bg='gray.800'
							borderBottom='5px solid'
							borderBottomColor='teal.500'
						>
							<Text fontSize='4xl'>{currentResto.name}'s Resto</Text>
							<Text fontSize='xl'>{currentResto.address}</Text>
						</Flex>
					</Flex>
					<Flex flexDir='column' p='4' pt='0'>
						<Button
							variant='ghost'
							rounded='none'
							textAlign='left'
							justifyContent='flex-start'
							leftIcon={<EditIcon />}
						>
							Edit Resto
						</Button>
						<Button
							variant='ghost'
							rounded='none'
							textAlign='left'
							justifyContent='flex-start'
							leftIcon={<DeleteIcon />}
						>
							Hapus Resto
						</Button>
						<Button
							variant='ghost'
							rounded='none'
							textAlign='left'
							justifyContent='flex-start'
							leftIcon={<ChevronLeftIcon />}
						>
							Kembali ke pilihan Resto
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</AppPage>
	)
}

export default withProtectedRoute(Restaurant)
