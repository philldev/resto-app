import { Button } from '@chakra-ui/button'
import Image from 'next/image'
import { Box, Flex, HStack, Link } from '@chakra-ui/layout'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
	const router = useRouter()
	return (
		<Box pos='fixed' left='0' top='0' w='full'>
			<Flex w='full' h='16' alignItems='center' px='4'>
				<Link as={NextLink} fontSize='lg' href='/'>
					<Image width='32px' height='32px' alt='logo' src='/logo.png' />
				</Link>
				<HStack alignItems='center' ml='auto'>
					{!router.pathname.includes('login') && (
						<NextLink href='/login' passHref>
							<Button>Masuk</Button>
						</NextLink>
					)}
					{router.pathname.includes('login') && (
						<NextLink href='/signup' passHref>
							<Button>Signup</Button>
						</NextLink>
					)}
				</HStack>
			</Flex>
		</Box>
	)
}
