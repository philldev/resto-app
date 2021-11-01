import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout'

export default function Home() {
	return (
		<Box d='grid' placeItems='center' w='full' h='100vh' bg='gray.800'>
			<Box>
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
			</Box>
			<Flex
				position='fixed'
				bottom='0'
				left='0'
				justifyContent='center'
				alignItems='center'
				w='full'
				p='4'
			>
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
		</Box>
	)
}
