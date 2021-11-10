import { Box, Flex } from '@chakra-ui/layout'
import Page from '../components/common/Page'
import withProtectedRoute from '../components/hoc/withProtectedRoute'

function App() {
	return (
		<Page>
			<Flex flexDir='column' h='100vh' w='100vw'>
				<Flex alignItems='center' borderBottom='1px solid' borderBottomColor='gray.700' h='14' px='4'>Header</Flex>
				<Flex flex='1 0' p='4'>Main</Flex>
				<Flex alignItems='center' borderTop='1px solid' borderTopColor='gray.700' h='14' px='4'>Bottom bar</Flex>
			</Flex>
		</Page>
	)
}

export default withProtectedRoute(App)
