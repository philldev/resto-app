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
				<Box pos='relative' w='100vw' h='100vh'>
					<Box
						pos='fixed'
						left='0'
						top='0'
						h='full'
						w='80'
						bg='gray.800'
						borderRightWidth='1px'
						borderRightStyle='solid'
						borderRightColor='gray.700'
					>
						Sidebar
					</Box>
					<Box pl='80' h='full' flex='1' flexShrink='0'>
						<Box
							h='20'
							borderBottomWidth='1px'
							borderBottomStyle='solid'
							borderBottomColor='gray.700'
						>
							Topbar
						</Box>
						<Box>MainContent</Box>
					</Box>
				</Box>
			</Page>
		)
}
