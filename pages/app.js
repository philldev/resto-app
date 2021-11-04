import { Button } from '@chakra-ui/button'
import { Box, Heading } from '@chakra-ui/layout'
import * as React from 'react'
import LoaderPage from '../components/common/LoaderPage'
import Page from '../components/common/Page'
import { useAuth } from '../context/auth'
import useProtectedRoute from '../hooks/useProtectedRoute'

export default function App() {
	const user = useProtectedRoute()
	const { signout } = useAuth()
	if (user === undefined) return <LoaderPage />
	if (!user) return null
	if (user)
		return (
			<Page>
				<Heading>App</Heading>
				<Box>
					<Button onClick={signout}>Logout</Button>
				</Box>
			</Page>
		)
}
