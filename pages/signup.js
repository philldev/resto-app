import { Box, Link, Text, VStack } from '@chakra-ui/layout'
import Head from 'next/head'
import NextLink from 'next/link'
import LoaderPage from '../components/common/LoaderPage'
import Page from '../components/common/Page'
import SignupForm from '../components/SignupForm'
import useAuthRoute from '../hooks/useAuthRoute'

const SignupPage = () => {
	const user = useAuthRoute()
	if (user === undefined) return <LoaderPage />
	if (user) return null
	return (
		<>
			<Head>
				<title>Signup to relio</title>
			</Head>
			<Page isHeaderDisplayed isFooterDisplayed>
				<SignupForm />
				<VStack mt='4'>
					<Box>
						<Text as='span'>Have account? </Text>
						<Link
							as={NextLink}
							href='/login'
							color='teal.400'
							fontWeight='bold'
							ml='2'
							display='inline-block'
						>
							Login
						</Link>
					</Box>
				</VStack>
			</Page>
		</>
	)
}

export default SignupPage
