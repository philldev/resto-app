import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/layout'

export default function HomePage() {
	return (
		<Box w='full' h='100vh' bg='gray.800'>
			<Box pos='fixed' left='0' top='0' w='full'>
				<Flex
					w='full'
					h='16'
					alignItems='center'
					px='4'
				>
					<Heading fontSize='lg'>Resto App</Heading>
					<HStack alignItems='center' ml='auto'>
						<Button>Login</Button>
						<Button>Signup</Button>
					</HStack>
				</Flex>
			</Box>
			<Flex
				alignItems='center'
				flexDir='column'
				justifyContent='center'
				pt='16'
				minH='calc(100vh - var(--chakra-space-10))'
			>
				<Box as='header' pt='12' mb='8'>
					<Heading textAlign='center' mb='4'>
						Resto App
					</Heading>
					<Text textAlign='center' px='8' maxW='md'>
						Dus sunt laborum exercitation cillum sint minim qui esse consequat
						dolor cupidatat tempor esse sint. Incididunt do ea ut occaecat nisi
						nulla minim sit adipisicing commodo officia non ad.
					</Text>
				</Box>
				<Flex justifyContent='center'>
					<Button>Get Started</Button>
				</Flex>
			</Flex>
			<Flex position='fixed' bottom='0' left='0' w='full'>
				<Flex justifyContent='center' alignItems='center' w='full' h='10'>
					<Button
						variant='link'
						as='a'
						mr='4'
						href='https://twitter.com/DeddyWolley'
						target='_blank'
					>
						👋 I made this
					</Button>
					<Button
						variant='link'
						as='a'
						href='https://github.com/philldev/resto-app'
						target='_blank'
					>
						👉 Github Repo{' '}
					</Button>
				</Flex>
			</Flex>
		</Box>
	)
}
