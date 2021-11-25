import { IconButton } from '@chakra-ui/button'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { chakra } from '@chakra-ui/system'
import { useRouter } from 'next/router'

export const BackButton = chakra((props) => {
	const router = useRouter()
	return (
		<IconButton
			onClick={() => (props.href ? router.push(props.href) : router.back())}
			variant='ghost'
			icon={<ArrowBackIcon w='6' h='6' />}
			{...props}
		/>
	)
})
