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
import withProtectedRoute from '../../../../components/hoc/withProtectedRoute'
import { RestoForm } from '../../../../components/RestoForm'
import { useUserResto } from '../../../../context/Resto'

const Restaurants = () => {
	return (
		<AppPage displayHeader={false}>
			<Flex direction='column' w='100vw' h='100vh'>
				<Flex flexDir='column' bg='gray.800' alignItems='center' p='4'>
					<Flex
						maxW='container.md'
						mx='auto'
						justifyContent='space-between'
						w='full'
						alignItems='center'
					>
						<Text fontSize='xl' fontWeight='bold'>
							Pilih Restoran
						</Text>
						<BackButton href='/app' />
					</Flex>
					<Flex
						maxW='container.md'
						mx='auto'
						justifyContent='space-between'
						w='full'
						alignItems='center'
					>
						<AddResto />
					</Flex>
				</Flex>
				<Flex bg='gray.900' flex='1' p='4'>
					<RestoList />
				</Flex>
			</Flex>
		</AppPage>
	)
}

const RestoList = () => {
	const { restoList } = useUserResto()
	return (
		<Grid w='full' gridAutoRows='max-content' gap='2'>
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
		router.push('/app/more')
	}
	return (
		<Box
			onClick={onClick}
			p='2'
			rounded='md'
			border='1px solid var(--chakra-colors-gray-600)'
			fontWeight='bold'
			textAlign='center'
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
