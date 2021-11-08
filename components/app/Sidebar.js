import { Box, Heading, VStack } from '@chakra-ui/layout'
import SidebarLink from './SidebarLink'

export default function Sidebar() {
	return (
		<Box
			h='full'
			bg='gray.800'
			borderRightWidth='1px'
			borderRightStyle='solid'
			borderRightColor='gray.700'
		>
			<Heading px='4' mb='6' pt='4' color='teal.400'>
				Resto App
			</Heading>
			<VStack alignItems='flex-start' px='4'>
				<SidebarLink href='/app'>Home</SidebarLink>
				<SidebarLink href='/app/orders'>Orders</SidebarLink>
				<SidebarLink href='/app/products'>Products</SidebarLink>
				<SidebarLink href='/app/statistics'>Statistics</SidebarLink>
				<SidebarLink href='/app/settings'>Settings</SidebarLink>
			</VStack>
		</Box>
	)
}
