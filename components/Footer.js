import { Button } from '@chakra-ui/button'
import { Flex } from '@chakra-ui/layout'

export default function Footer() {
	return (
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
	)
}
