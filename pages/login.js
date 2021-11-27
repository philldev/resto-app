import { Box, Link, Text, VStack } from '@chakra-ui/layout'
import Head from 'next/head'
import NextLink from 'next/link'
import LoaderPage from '../components/common/LoaderPage'
import Page from '../components/common/Page'
import LoginForm from '../components/LoginForm'
import useAuthRoute from '../hooks/useAuthRoute'

const LoginPage = () => {
	const user = useAuthRoute()
	if (user === undefined) return <LoaderPage />
	if (user) return null
	return (
		<>
			<Head>
				<title>Login to relio</title>
			</Head>
			<Page isHeaderDisplayed isFooterDisplayed>
				<LoginForm />
				<VStack mt='4'>
					<Box>
						<Text as='span'>Don&apos;t have account? </Text>
						<Link
							as={NextLink}
							href='/signup'
							color='teal.400'
							fontWeight='bold'
							ml='2'
							display='inline-block'
						>
							Create Account
						</Link>
					</Box>
				</VStack>
			</Page>
		</>
	)
}

export default LoginPage
