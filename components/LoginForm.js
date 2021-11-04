import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Heading, Text, VStack } from '@chakra-ui/layout'
import { useForm } from 'react-hook-form'
import { signinResolver } from '../utils/formSchema/signinFormSchema'

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: signinResolver,
	})
	const onSubmit = (data) => console.log(data)

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
			<Button w='full' type='submit'>
				Continue
			</Button>
		</VStack>
	)
}
