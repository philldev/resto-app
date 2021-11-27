import { Flex } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'

export const AppTopbar = chakra(({ children, ...props }) => {
	return (
		<Flex
			borderBottom={{
				base: '1px solid var(--chakra-colors-gray-700)',
				md: 'none',
			}}
			{...props}
		>
			<Flex
				maxW='container.md'
				w='full'
				mx='auto'
				alignItems='center'
				justifyContent='space-between'
				h='14'
				px='2'
			>
				{children}
			</Flex>
		</Flex>
	)
})
