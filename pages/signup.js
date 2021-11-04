import { Box, Link, Text, VStack } from '@chakra-ui/layout'
import Head from 'next/head'
import NextLink from 'next/link'
import Page from '../components/common/Page'
import SignupForm from '../components/SignupForm'

export default function SignupPage() {
	return (
		<>
			<Head>
				<title>Signup to Resto App</title>
			</Head>
			<Page isHeaderDisplayed isFooterDisplayed>
				<SignupForm />
				<VStack mt='4'>
					<Box>
						<Text as='span'>Have account?</Text>
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
