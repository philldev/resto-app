import { Button } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Flex, VStack } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/textarea'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/auth'
import { useUserResto } from '../context/Resto'
import { RestoFormResolver } from '../utils/formSchema/restoFormSchema'

export const RestoForm = ({ isEditing, resto, onSuccess, onCancel }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: resto,
		resolver: RestoFormResolver,
	})
	const [isLoading, setIsLoading] = React.useState()
	const { addUserResto, updateUserResto } = useUserResto()
	const onSubmit = async (data) => {
		try {
			setIsLoading(true)
			if (isEditing) {
				updateUserResto(resto.id, data)
			} else {
				await addUserResto(data)
			}
			onSuccess()
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}
	return (
		<Flex as='form' onSubmit={handleSubmit(onSubmit)} flexDir='column' pb='4'>
			<VStack spacing='2' mb='4'>
				<FormControl w='full'>
					<FormLabel>Nama*</FormLabel>
					<Input
						w='full'
						bg='gray.700'
						border='none'
						placeholder='Masukan name kategori'
						{...register('name')}
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'>
						{errors.name?.message}
					</FormHelperText>
				</FormControl>
				<FormControl w='full'>
					<FormLabel>Alamat*</FormLabel>
					<Textarea
						w='full'
						bg='gray.700'
						border='none'
						placeholder='Masukan name kategori'
						{...register('address')}
					/>

					<FormHelperText fontSize='sm' color='red.400' mt='2'>
						{errors.address?.message}
					</FormHelperText>
				</FormControl>
			</VStack>
			<VStack>
				<Button type='submit' isLoading={isLoading} w='full' colorScheme='teal'>
					{isEditing ? 'Edit' : 'Tambah'}
				</Button>
				<Button onClick={onCancel} w='full' variant='outline'>
					Batal
				</Button>
			</VStack>
		</Flex>
	)
}
