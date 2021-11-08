import { Box, Grid, Heading } from '@chakra-ui/layout'
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat'

function Stats() {
	return (
		<Box>
			<Heading fontSize='2xl' mb='3'>Resto Stats</Heading>
			<Grid templateColumns='1fr 1fr 1fr' mb='4' gap='2'>
				<Stat p='2' px='4' borderWidth='1px' borderColor='gray.600' rounded='md'>
					<StatLabel>Collected Fees</StatLabel>
					<StatNumber>£0.00</StatNumber>
					<StatHelpText>Feb 12 - Feb 28</StatHelpText>
				</Stat>
				<Stat p='2' px='4' borderWidth='1px' borderColor='gray.600' rounded='md'>
					<StatLabel>Collected Fees</StatLabel>
					<StatNumber>£0.00</StatNumber>
					<StatHelpText>Feb 12 - Feb 28</StatHelpText>
				</Stat>
				<Stat p='2' px='4' borderWidth='1px' borderColor='gray.600' rounded='md'>
					<StatLabel>Collected Fees</StatLabel>
					<StatNumber>£0.00</StatNumber>
					<StatHelpText>Feb 12 - Feb 28</StatHelpText>
				</Stat>
			</Grid>
		</Box>
	)
}

export default Stats
