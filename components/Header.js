import { Button } from '@chakra-ui/button'
import { Box, Flex, HStack, Link } from '@chakra-ui/layout'
import NextLink from 'next/link'

export default function Header() {
	return (
		<Box pos='fixed' left='0' top='0' w='full'>
			<Flex w='full' h='16' alignItems='center' px='4'>
				<Link as={NextLink} fontSize='lg' href='/'>
					RestoApp
				</Link>
				<HStack alignItems='center' ml='auto'>
					<NextLink href='/login' passHref>
						<Button>Login</Button>
					</NextLink>
					<NextLink href='/signup' passHref>
						<Button>Signup</Button>
					</NextLink>
				</HStack>
			</Flex>
		</Box>
	)
}
