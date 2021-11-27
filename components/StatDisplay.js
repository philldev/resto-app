import { Box } from '@chakra-ui/layout'
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat'

const StatDisplay = ({ value, label }) => {
	return (
		<Box
			w='full'
		>
			<Stat>
				<StatLabel color='gray.400'>{label}</StatLabel>
				<StatNumber fontSize='lg'>{value}</StatNumber>
			</Stat>
		</Box>
	)
}

export default StatDisplay
