import { Button } from '@chakra-ui/button'
import * as RestoApi from '../../firebase/resto'
import * as React from 'react'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import { AddIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal'
import { Textarea } from '@chakra-ui/textarea'
import { useForm } from 'react-hook-form'
import { BackBtn } from '../../components/common/BackBtn'
import { CogIcon } from '../../components/common/icons/CogIcon'
import { HomeIcon } from '../../components/common/icons/HomeIcon'
import Page from '../../components/common/Page'
import withProtectedRoute from '../../components/hoc/withProtectedRoute'
import { useAuth } from '../../context/auth'
import { createDocId } from '../../firebase/helper/createDocId'
import { RestoFormResolver } from '../../utils/formSchema/restoFormSchema'
import { useUserResto } from '../../context/Resto'
import { useRouter } from 'next/router'
import { RestoForm } from '../../components/RestoForm'

const restaurants = [
	{
		name: 'Janji Jiwa',
		address:
			'Jl. Sengel, Matani Satu, Kec. Tomohon Tengah, Kota Tomohon, Sulawesi Utara',
		id: createDocId(),
	},
	{
		name: 'Kelelondey',
		id: createDocId(),
		address:
			'5R5P+7VM, Toraget, North Langowan, Minahasa Regency, North Sulawesi',
	},
]

function RestaurantsPage() {
	const { user } = useAuth()
	const { restoList, selectResto } = useUserResto()
	const router = useRouter()
	return (
		<Page>
			<Flex flexDir='column' w='100vw' h='100vh' overflow='hidden'>
				<Flex alignItems='center' justifyContent='space-between' p='4'>
					<Flex alignItems='center'>
						{user.restaurantList && <BackBtn to='/user' mr='2' />}
						<Box fontSize='xl'>Pilih Restoran</Box>
					</Flex>
					<CogIcon w='6' h='6' />
				</Flex>
				<Flex flexDir='column' flex='1' p='4' bg='gray.900' overflowY='auto'>
					<AddResto />
					{restoList.map((item, index) => (
						<Flex
							onClick={() => {
								selectResto(item)
								router.push('/app')
							}}
							p='4'
							w='full'
							textAlign='left'
							as='button'
							border='1px solid'
							borderColor='gray.700'
							key={index}
							rounded='md'
							_focus={{
								bg: 'gray.600',
							}}
							_active={{
								bg: 'gray.600',
							}}
							_hover={{
								bg: 'gray.700',
							}}
						>
							<HomeIcon w='8' h='8' mr='4' flexShrink='0' />
							<Box>
								<Text fontWeight='bold' fontSize='xl'>
									{item.name}
								</Text>
								<Text color='gray.200'>{item.address}</Text>
							</Box>
						</Flex>
					))}
				</Flex>
			</Flex>
		</Page>
	)
}

const AddResto = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Button
				onClick={onOpen}
				minH='10'
				flexShrink='0'
				mb='4'
				leftIcon={<AddIcon />}
			>
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

export default withProtectedRoute(RestaurantsPage)
