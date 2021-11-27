import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Flex, Grid, Text } from '@chakra-ui/layout'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal'
import { useRouter } from 'next/router'
import { BackButton } from '../../../../components/BackButton'
import { AppPage } from '../../../../components/common/AppPage'
import { AppTopbar } from '../../../../components/common/AppTopbar'
import withProtectedRoute from '../../../../components/hoc/withProtectedRoute'
import { RestoForm } from '../../../../components/RestoForm'
import { useUserResto } from '../../../../context/Resto'

const Restaurants = () => {
	return (
		<AppPage displayHeader={false}>
			<Flex direction='column' w='100vw' h='100vh'>
				<AppTopbar>
					<Flex w='full' alignItems='center' justifyContent='space-between'>
						<Text fontSize='xl' fontWeight='bold'>
							Pilih Restoran
						</Text>
						<BackButton href='/app' />
					</Flex>
				</AppTopbar>
				<Flex
					flexDir='column'
					flex='1'
					maxW='container.md'
					mx='auto'
					w='full'
					py='4'
				>
					<Flex mb='4'>
						<AddResto />
					</Flex>
					<RestoList />
				</Flex>
			</Flex>
		</AppPage>
	)
}

const RestoList = () => {
	const { restoList } = useUserResto()
	return (
		<Grid w='full' gridAutoRows='max-content' gap='2' templateColumns='1fr'>
			{restoList.map((resto, index) => (
				<RestoItem key={index} {...{ resto }} />
			))}
		</Grid>
	)
}

const RestoItem = ({ resto }) => {
	const router = useRouter()
	const { selectResto } = useUserResto()
	const onClick = () => {
		selectResto(resto)
		router.push('/app')
	}
	return (
		<Box
			cursor='pointer'
			onClick={onClick}
			rounded='md'
			border='1px solid var(--chakra-colors-gray-600)'
			p='2'
			px='4'
			fontWeight='bold'
			fontSize='4xl'
		>
			{resto.name}
		</Box>
	)
}

const AddResto = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Button size='sm' variant='outline' onClick={onOpen}>
				Tambah Restoran
			</Button>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg='gray.800' mx='4'>
					<ModalHeader>Tambah Resto</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<RestoForm onSuccess={onClose} onCancel={onClose} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default withProtectedRoute(Restaurants)
