import { useMenuCategory } from "../context/MenuCategory"
import { useMenus } from "../context/Menus"
import * as React from "react"
import { useForm } from "react-hook-form"
import { MenuResolver } from "../utils/formSchema/menuSchema"
import { Box, Flex, VStack } from "@chakra-ui/layout"
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Select } from "@chakra-ui/select"
import Image from 'next/image'
import { Button } from "@chakra-ui/button"

export const MenuForm = ({ isEditing, menu, onSuccess, onCancel }) => {
	const { addMenu, updateMenu } = useMenus()
	const { menuCategories } = useMenuCategory()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: menu,
		resolver: MenuResolver,
	})

	const [isLoading, setIsLoading] = React.useState()
	const onSubmit = async (data) => {
		try {
			setIsLoading(true)
			if (isEditing) {
				await updateMenu(data)
			} else {
				await addMenu(data)
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
						placeholder='Masukan name menu'
						{...register('name')}
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'>
						{errors.name?.message}
					</FormHelperText>
				</FormControl>
				<FormControl w='full'>
					<FormLabel>Harga*</FormLabel>
					<Input
						w='full'
						bg='gray.700'
						border='none'
						type='number'
						placeholder='Masukan harga menu'
						{...register('price')}
					/>
					<FormHelperText fontSize='sm' color='red.400' mt='2'>
						{errors.price?.message}
					</FormHelperText>
				</FormControl>
				<FormControl id='country'>
					<FormLabel>Kategori*</FormLabel>
					<Select placeholder='Pilih Kategori' {...register('categoryId')}>
						{menuCategories.map((i) => (
							<option
								value={i.id}
								selected={i.id === menu?.categoryId}
								key={i.id}
							>
								{i.name}
							</option>
						))}
					</Select>
					<FormHelperText fontSize='sm' color='red.400' mt='2'>
						{errors.categoryId?.message}
					</FormHelperText>
				</FormControl>
				<FormControl w='full'>
					<FormLabel>Foto</FormLabel>
					{isEditing && menu?.imageURL ? (
						<Box
							w='30%'
							mr='4'
							h='20'
							pos='relative'
							rounded='xl'
							overflow='hidden'
						>
							<Image
								layout='fill'
								objectFit='cover'
								src={menu.imageURL}
								alt={menu.name}
							/>
						</Box>
					) : (
						<Button w='full' variant='outline'>
							Upload Foto
						</Button>
					)}
					<FormHelperText fontSize='sm' color='red.400' mt='2'></FormHelperText>
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
