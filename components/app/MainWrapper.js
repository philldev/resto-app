import { Box } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'

function MainWrapperComp({ children, ...rest }) {
	return (
		<Box pl='80' h='full' flex='1' flexShrink='0' {...rest}>
			{children}
		</Box>
	)
}

const MainWrapper = chakra(MainWrapperComp)

export default MainWrapper
