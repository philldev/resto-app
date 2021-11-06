import { Avatar } from '@chakra-ui/avatar'
import { Box, Text } from '@chakra-ui/layout'
import { ChevronDown } from '../common/icons/ChevronDown'

export default function MainTopbar() {
	return (
		<Box
			h='20'
			borderBottomWidth='1px'
			borderBottomStyle='solid'
			borderBottomColor='gray.700'
			d='flex'
			alignItems='center'
			p='4'
		>
			<Box>
				<Text fontWeight='bold' fontSize='2xl'>
					Resto Name
				</Text>
				<Text fontSize='sm'>
					{new Date().toLocaleDateString('id-ID', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</Text>
			</Box>
			<Box
				p='2'
				cursor='pointer'
				_hover={{ bg: 'gray.700' }}
				rounded='md'
				d='flex'
				alignItems='center'
				ml='auto'
			>
				<Avatar size='sm' name='Deddy Wolley' mr='2' />
				<Box mr='2'>
					<Text fontSize='sm'>Deddy Wolley</Text>
					<Text fontSize='xs'>Admin</Text>
				</Box>
				<ChevronDown w='4' h='4' />
			</Box>
		</Box>
	)
}
