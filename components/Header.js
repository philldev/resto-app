import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, HStack } from '@chakra-ui/layout'
import Link from 'next/link'

export default function Header() {
	return (
		<Box pos='fixed' left='0' top='0' w='full'>
			<Flex w='full' h='16' alignItems='center' px='4'>
				<Heading fontSize='lg'>Resto App</Heading>
				<HStack alignItems='center' ml='auto'>
					<Link href='/login' passHref>
						<Button>Login</Button>
					</Link>
					<Link href='/signup' passHref>
						<Button>Signup</Button>
					</Link>
				</HStack>
			</Flex>
		</Box>
	)
}
