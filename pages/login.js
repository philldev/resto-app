import { Box, Link, Text, VStack } from '@chakra-ui/layout'
import Head from 'next/head'
import NextLink from 'next/link'
import Page from '../components/common/Page'
import LoginForm from '../components/LoginForm'

export default function LoginPage() {
	return (
		<>
			<Head>
				<title>Login to Resto App</title>
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
