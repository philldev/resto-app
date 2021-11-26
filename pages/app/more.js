import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
} from '@chakra-ui/accordion'
import { Avatar } from '@chakra-ui/avatar'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Grid, Text } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'
import { AppPage } from '../../components/common/AppPage'
import withProtectedRoute from '../../components/hoc/withProtectedRoute'
import { useAuth } from '../../context/auth'
import { useUserResto } from '../../context/Resto'
import Link from 'next/link'
import { Tag } from '@chakra-ui/tag'

function More() {
	const { currentResto } = useUserResto()
	if (!currentResto) return null
	return (
		<AppPage displayHeader={false}>
			<Flex bg='gray.900' flexDir='column' flex='1'>
				<Flex bg='gray.800' alignItems='center' p='4'>
					<Flex maxW='container.md' mx='auto' w='full' alignItems='center'>
						<Text fontSize='xl' fontWeight='bold'>
							Lainnya
						</Text>
					</Flex>
				</Flex>
				<Box flex='1' px='4' py='4'>
					<Box rounded='md' h='full' maxW='container.md' w='full' mx='auto'>
						<Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap='2'>
							<UserView mb='4' />
							<RestoView mb='4' />
						</Grid>
						<NavList />
					</Box>
				</Box>
			</Flex>
		</AppPage>
	)
}

const NavList = () => {
	const { currentResto } = useUserResto()
	const { signout } = useAuth()
	return (
		<Accordion d='grid' gridTemplateColumns={{md:'1fr 1fr'}} gridColumnGap={{md:'4'}} allowMultiple allowToggle flexDir='column'>
			<Link href='/app/settings/account' passHref>
				<NavItem>Akun</NavItem>
			</Link>
			<AccordionItem border='none'>
				<AccordionButton p='0' border='none'>
					<NavItem hideIcon>Restaurant</NavItem>
					<AccordionIcon transform='rotate(-90deg)' />
				</AccordionButton>
				<AccordionPanel pr='0' pt='0' pb='4'>
					<Link href={`/app/settings/restaurant`} passHref>
						<NavItem>{currentResto.name}</NavItem>
					</Link>
					<Link href={`/app/settings/account/restaurants`} passHref>
						<NavItem>Lihat Semua restoran</NavItem>
					</Link>
				</AccordionPanel>
			</AccordionItem>
			<Link href={`/app/settings/preferences`} passHref>
				<NavItem>Pengaturan</NavItem>
			</Link>
			<NavItem onClick={signout} hideIcon>
				Keluar
			</NavItem>
		</Accordion>
	)
}

const NavItem = chakra(({ hideIcon, ...props }) => (
	<Flex
		cursor='pointer'
		alignItems='center'
		fontSize='sm'
		justifyContent='space-between'
		h='10'
		w='full'
		color='gray.200'
		{...props}
	>
		<Text fontWeight='bold'>{props.children}</Text>
		{!hideIcon && <ChevronRightIcon w='5' h='5' />}
	</Flex>
))

const UserView = chakra((props) => {
	const { user } = useAuth()
	return (
		<Flex {...props}>
			<Box flex='1'>
				<Flex alignItems='center'>
					<Text fontWeight='bold' mr='2'>USER</Text>
					<Tag fontSize='10px' size='sm'>FREE ACCOUNT</Tag>
				</Flex>
				<Text color='gray.300'>{user.email}</Text>
			</Box>
			<Avatar size='md' src='' name={user.email} />
		</Flex>
	)
})

const RestoView = chakra((props) => {
	const { currentResto } = useUserResto()
	return (
		<Flex {...props}>
			<Box flex='1'>
				<Text fontWeight='bold'>RESTO</Text>
				<Text color='gray.300'>{currentResto.name}</Text>
			</Box>
		</Flex>
	)
})

export default withProtectedRoute(More)
