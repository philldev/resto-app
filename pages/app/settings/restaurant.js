import { Button } from '@chakra-ui/button'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Flex, Grid, Text } from '@chakra-ui/layout'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
} from '@chakra-ui/modal'
import * as React from 'react'
import { BackButton } from '../../../components/BackButton'
import { AppPage } from '../../../components/common/AppPage'
import { DataDisplay } from '../../../components/DataDisplay'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { useUserResto } from '../../../context/Resto'

function Restaurant() {
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
							Profil Restoran
						</Text>
						<BackButton href='/app/more' />
					</Flex>
				</Flex>
				<Flex bg='gray.900' flex='1' p='4'>
					<Box rounded='md' h='full' maxW='container.md' w='full' mx='auto'>
						<RestaurantProfile />

						<Box mt='4'>
							<DeleteResto />
						</Box>
					</Box>
				</Flex>
			</Flex>
		</AppPage>
	)
}

const DeleteResto = ({ resto }) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const onClose = () => setIsOpen(false)
	const onOpen = () => setIsOpen(true)
	const cancelRef = React.useRef()
	const { deleteUserResto, currentResto } = useUserResto()
	const [isLoading, setIsLoading] = React.useState(false)

	const onDelete = async () => {
		setIsLoading(true)
		try {
			await deleteUserResto(resto.id)
			if (currentResto.id !== resto.id) onClose()
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	return (
		<>
			<Button
				onClick={onOpen}
				variant='outline'
				textAlign='left'
				size='sm'
				color='red.200'
				justifyContent='flex-start'
			>
				Hapus Resto
			</Button>
			<AlertDialog
				isCentered
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent mx='4' bg='gray.800'>
						<AlertDialogHeader fontSize='lg'>
							Hapus Resto{' '}
							<Text as='span' fontWeight='bold'>
								{resto?.name}
							</Text>
						</AlertDialogHeader>
						<AlertDialogBody>
							Are you sure? You can&apos;t undo this action afterwards.
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button isLoading={isLoading} ref={cancelRef} onClick={onClose}>
								Tidak
							</Button>
							<Button
								isLoading={isLoading}
								colorScheme='red'
								onClick={onDelete}
								ml={3}
							>
								Ya
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	)
}

const RestaurantProfile = () => {
	const { currentResto } = useUserResto()
	return (
		<Grid
			gap='4'
			templateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }}
		>
			<DataDisplay label='Nama' data={currentResto.name} />
			<DataDisplay label='Alamat' data={currentResto.address} />
			<DataDisplay label='No Handphone' data={currentResto.dob} />
		</Grid>
	)
}

export default withProtectedRoute(Restaurant)
