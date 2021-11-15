import { Button } from "@chakra-ui/button"
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Flex, VStack } from "@chakra-ui/layout"
import * as React from "react"
import { useForm } from "react-hook-form"
import { useMenuCategory } from "../context/MenuCategory"
import { MenuCategoryResolver } from "../utils/formSchema/menuCategorySchema"

export const MenuCategoryForm = ({ isEditing, category, onSuccess, onCancel }) => {
	const { addMenuCategory, updateMenuCategory } = useMenuCategory()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: category,
		resolver: MenuCategoryResolver,
	})
	const [isLoading, setIsLoading] = React.useState()
	const onSubmit = async (data) => {
		try {
			setIsLoading(true)
			if (isEditing) {
				await updateMenuCategory(data)
			} else {
				await addMenuCategory(data)
			}
			onSuccess()
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}
	return (
		<Flex as='form' onSubmit={handleSubmit(onSubmit)} flexDir='column' pb='4'>
			<VStack spacing='0' mb='4'>
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
			</VStack>
			<VStack>
				<Button isLoading={isLoading} type='submit' w='full' colorScheme='teal'>
					{isEditing ? 'Edit' : 'Tambah'}
				</Button>
				<Button
					isLoading={isLoading}
					onClick={onCancel}
					w='full'
					variant='outline'
				>
					Batal
				</Button>
			</VStack>
		</Flex>
	)
}
