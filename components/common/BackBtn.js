import { IconButton } from '@chakra-ui/button'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { chakra } from '@chakra-ui/system'
import { useRouter } from 'next/router'

export const BackBtn = chakra(({ to, ...props }) => {
	const router = useRouter()
	return (
		<IconButton
			icon={<ChevronLeftIcon w='8' h='8' />}
			variant='ghost'
			onClick={() => {
				if (to) {
					router.push(to)
				} else {
					router.back()
				}
			}}
			{...props}
		/>
	)
})
