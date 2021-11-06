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
				overflow='hidden'
				flexDir='column'
				alignItems='center'
				justifyContent='center'
				pt={isHeaderDisplayed ? '16' : '0'}
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
