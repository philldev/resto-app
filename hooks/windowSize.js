import { useWindowWidth } from "@react-hook/window-size"

export const useIsMdSize = () => {
	const wWidth =  useWindowWidth()
	const isMdSize = wWidth >= 768
	return isMdSize
}