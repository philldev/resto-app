import { Box, Flex, Heading, Link, VStack } from '@chakra-ui/layout'
import NextLink from 'next/link'
import SidebarLink from './SidebarLink'

export default function Sidebar() {
	return (
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
			<Heading px='4' mb='6' pt='4'>
				Resto Logo
			</Heading>
			<VStack alignItems='flex-start' px='4'>
				<SidebarLink href='/app'>Home</SidebarLink>
				<SidebarLink href='/app/order-history'>Order History</SidebarLink>
				<SidebarLink href='/app/products'>Products</SidebarLink>
				<SidebarLink href='/app/statistics'>Statistics</SidebarLink>
				<SidebarLink href='/app/settings'>Settings</SidebarLink>
			</VStack>
		</Box>
	)
}
