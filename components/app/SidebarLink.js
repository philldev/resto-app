import { Link } from '@chakra-ui/layout'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export default function SidebarLink({ href, children }) {
	const router = useRouter()

	const isActive = router.pathname === href

	return (
		<NextLink href={href} passHref>
			<Link
				display='flex'
				w='full'
				h='10'
				alignItems='center'
				fontWeight='bold'
				p='2'
				bg={isActive ? 'gray.700' : undefined}
				rounded='md'
				color={isActive ? 'white' : 'gray.300'}
				_focus={{
					boxShadow: 'none',
					borderBottomColor: 'teal.200',
				}}
				_hover={{
					textDecoration: 'none',
					bg: isActive ? undefined : 'gray.900',
				}}
				transition='all ease-in .2s'
			>
				{children}
			</Link>
		</NextLink>
	)
}
