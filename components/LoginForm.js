import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Heading, Text, VStack } from '@chakra-ui/layout'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/auth'
import { signinResolver } from '../utils/formSchema/signinFormSchema'
import * as React from 'react'

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: signinResolver,
	})

	const { signin } = useAuth()
	const [isLoading, setIsLoading] = React.useState(false)
	const [generalErr, setGeneralErr] = React.useState(null)

	const onSubmit = async (data) => {
		try {
			setIsLoading(true)
			await signin(data)
		} catch (error) {
			setIsLoading(false)
			if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
				setGeneralErr('Wrong email or password!')
			}
		}
	}

	return (
		<VStack
			as='form'
			onSubmit={handleSubmit(onSubmit)}
			maxW='sm'
			w='full'
			spacing='6'
		>
			<Heading>Login</Heading>
			<VStack w='full' spacing='2'>
				<Box w='full'>
					<Text mb='1' fontSize='sm'>
						Email
					</Text>
					<Input
						w='full'
						bg='gray.700'
						border='none'
						placeholder='Enter your Email'
						{...register('email')}
					/>
					<Text fontSize='sm' color='red.400' mt='2'>
						{errors.email?.message}
					</Text>
				</Box>
				<Box w='full'>
					<Text mb='1' fontSize='sm'>
						Password
					</Text>
					<Input
						w='full'
						bg='gray.700'
						border='none'
						placeholder='Enter your Password'
						type='password'
						{...register('password')}
					/>
					<Text fontSize='sm' color='red.400' mt='2'>
						{errors.password?.message}
					</Text>
				</Box>
			</VStack>
			<Button isLoading={isLoading} w='full' type='submit'>
				Continue
			</Button>
			{generalErr && (
				<Box bg='red.400' rounded='sm' p='2' w='full'>
					<Text fontSize='sm'>Error : {generalErr}</Text>
				</Box>
			)}
		</VStack>
	)
}
