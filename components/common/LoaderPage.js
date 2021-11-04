import { Flex } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'

export default function LoaderPage() {
	return (
		<Flex
			flexDir='column'
			alignItems='center'
			justifyContent='center'
			pt='16'
			minH='100vh'
		>
			<CircularProgress isIndeterminate color='teal.400' trackColor='gray.900' />
		</Flex>
	)
}
