import { Button } from '@chakra-ui/button'
import { Box, Flex, Grid, Text } from '@chakra-ui/layout'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
} from '@chakra-ui/modal'
import { useRouter } from 'next/router'
import * as React from 'react'
import { BackButton } from '../../../components/BackButton'
import { AppPage } from '../../../components/common/AppPage'
import { AppTopbar } from '../../../components/common/AppTopbar'
import { DataDisplay } from '../../../components/DataDisplay'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { useUserResto } from '../../../context/Resto'

const Restaurant = () => {
	return (
		<AppPage displayHeader={false}>
			<Flex direction='column' w='100vw' h='100vh'>
				<AppTopbar>
					<Flex w='full' alignItems='center' justifyContent='space-between'>
						<Text fontSize='xl' fontWeight='bold'>
							Profil Restoran
						</Text>
						<BackButton href='/app' />
					</Flex>
				</AppTopbar>
				<Flex flex='1' p='4'>
					<Box rounded='md' h='full' maxW='container.md' w='full' mx='auto'>
						<RestaurantProfile />
					</Box>
				</Flex>
			</Flex>
		</AppPage>
	)
}

Restaurant.title = 'Pengaturan | Restorant'

const DeleteResto = ({ resto }) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const onClose = () => setIsOpen(false)
	const onOpen = () => setIsOpen(true)
	const cancelRef = React.useRef()
	const { deleteUserResto } = useUserResto()
	const [isLoading, setIsLoading] = React.useState(false)

	const router = useRouter()

	const onDelete = async () => {
		setIsLoading(true)
		try {
			await deleteUserResto(resto.id)

			router.push('/app/account/restaurants')
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
			templateColumns={'1fr'}
			maxW='375px'
			w='full'
			border='1px solid var(--chakra-colors-gray-700)'
			p='4'
			mx='auto'
		>
			<DataDisplay label='Nama' data={currentResto.name} />
			<DataDisplay label='Alamat' data={currentResto.address} />
			<DataDisplay label='No Handphone' data={currentResto.dob} />
			<Box mt='2'>
				<DeleteResto />
			</Box>
		</Grid>
	)
}

export default withProtectedRoute(Restaurant)
