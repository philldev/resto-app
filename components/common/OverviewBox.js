import { Box } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'

export const OverviewBox = chakra(({ children, ...props }) => {
	return (
		<Box px='3' py='3' border='1px solid var(--chakra-colors-gray-600)' rounded='md' {...props}>
			{children}
		</Box>
	)
})
