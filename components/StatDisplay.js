import { Box } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat'

const StatDisplay = ({ value, label, isLoading }) => {
	return (
		<Box w='full'>
			<Stat>
				<StatLabel color='gray.400'>{label}</StatLabel>
				{isLoading ? (
					<Skeleton h='20px' />
				) : (
					<StatNumber fontSize='lg'>{value}</StatNumber>
				)}
			</Stat>
		</Box>
	)
}

export default StatDisplay
