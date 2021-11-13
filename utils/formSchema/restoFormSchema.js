import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'

const RestoFormSchema = yup
	.object({
		name: yup.string().required('Nama harus diisi!'),
		address: yup
			.string()
			.required('Address harus diisi!')
			.max(225, 'Maksimal 255 karakter!'),
	})
	.required()

const RestoFormResolver = yupResolver(RestoFormSchema)

export { RestoFormResolver, RestoFormSchema }
