import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { OrderTypeEnum } from '../../context/NewOrder'

const TakeAwaySchema = yup
	.object({
		customer: yup.string().required('Nama kostumer harus diisi!'),
		notes: yup.string(),
	})
	.required()

const DineInSchema = yup
	.object({
		customer: yup.string().required('Nama kostumer harus diisi!'),
		notes: yup.string(),
		table: yup.number().required('Meja harus di pilih').not([-1], 'Meja harus di pilih'),
	})
	.required()

const getOrderResolver = (orderType) =>
	orderType === OrderTypeEnum.TAKE_AWAY
		? yupResolver(TakeAwaySchema)
		: yupResolver(DineInSchema)

export { getOrderResolver }
