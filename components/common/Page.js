import { Flex } from '@chakra-ui/layout'
import Footer from '../Footer'
import Header from '../Header'

export default function Page({
	children,
	isHeaderDisplayed,
	isFooterDisplayed,
}) {
	return (
		<>
			{isHeaderDisplayed && <Header />}
			<Flex
				flexDir='column'
				alignItems='center'
				justifyContent='center'
				pt='16'
				minH={
					isHeaderDisplayed ? 'calc(100vh - var(--chakra-space-10))' : '100vh'
				}
			>
				{children}
			</Flex>
			{isFooterDisplayed && <Footer />}
		</>
	)
}
