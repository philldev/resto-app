import { IconButton } from '@chakra-ui/button'
import { EditIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'

export const DataDisplay = chakra(({ onEditClick, label, data, ...props }) => {
	return (
		<Box {...props}>
			<Text fontSize='xs' mb='1' color='gray.400'>
				{label}
			</Text>
			<Flex alignItems='center'>
				{data ? (
					<Text color='gray.200'>{data}</Text>
				) : (
					<Text color='gray.600'>belum ada</Text>
				)}
				<IconButton
					onClick={onEditClick}
					ml='2'
					size='xs'
					icon={<EditIcon />}
				/>
			</Flex>
		</Box>
	)
})
