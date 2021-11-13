import { Box, Flex } from '@chakra-ui/layout'
import { BackBtn } from '../../components/common/BackBtn'
import { CogIcon } from '../../components/common/icons/CogIcon'
import Page from '../../components/common/Page'
import withProtectedRoute from '../../components/hoc/withProtectedRoute'

function UserPage() {
	return (
		<Page>
			<Flex flexDir='column' w='100vw' h='100vh'>
				<Flex alignItems='center' justifyContent='space-between' p='4' pb='0'>
					<Flex alignItems='center'>
						<BackBtn to='/user' mr='2' />
						<Box fontSize='xl'>Settings</Box>
					</Flex>
					<CogIcon w='6' h='6' />
				</Flex>
				<Flex flex='1'>
					
				</Flex>
			</Flex>
		</Page>
	)
}

export default withProtectedRoute(UserPage)