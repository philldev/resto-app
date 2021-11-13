import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ChevronLeftIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/layout'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal'
import { useRouter } from 'next/router'
import * as React from 'react'
import { AppPage } from '../../../components/common/AppPage'
import { HomeIcon } from '../../../components/common/icons/HomeIcon'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'
import { RestoForm } from '../../../components/RestoForm'
import { useUserResto } from '../../../context/Resto'

function Restaurant() {
	const { currentResto } = useUserResto()
	const router = useRouter()
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
							bg='gray.700'
							borderBottom='5px solid'
							borderBottomColor='teal.500'
						>
							<Text fontSize='4xl'>{currentResto.name}&apos;s Resto</Text>
							<Text fontSize='xl'>{currentResto.address}</Text>
						</Flex>
					</Flex>
					<Flex flexDir='column' p='4' pt='0'>
						<EditResto resto={currentResto} />
						<DeleteResto resto={currentResto} />
						<Button
							onClick={() => {
								router.push('/user/restaurants')
							}}
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

const DeleteResto = ({ resto }) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const onClose = () => setIsOpen(false)
	const onOpen = () => setIsOpen(true)
	const cancelRef = React.useRef()
	return (
		<>
			<Button
				onClick={onOpen}
				variant='ghost'
				rounded='none'
				textAlign='left'
				justifyContent='flex-start'
				leftIcon={<DeleteIcon />}
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
								{resto.name}
							</Text>
						</AlertDialogHeader>
						<AlertDialogBody>
							Are you sure? You can&apos;t undo this action afterwards.
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Tidak
							</Button>
							<Button colorScheme='red' onClick={onClose} ml={3}>
								Ya
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	)
}

const EditResto = ({ resto }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Button
				onClick={onOpen}
				variant='ghost'
				rounded='none'
				textAlign='left'
				justifyContent='flex-start'
				leftIcon={<EditIcon />}
			>
				Edit Resto
			</Button>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg='gray.800' mx='4'>
					<ModalHeader>Tambah Resto</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<RestoForm
							isEditing
							resto={resto}
							onSuccess={onClose}
							onCancel={onClose}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default withProtectedRoute(Restaurant)
