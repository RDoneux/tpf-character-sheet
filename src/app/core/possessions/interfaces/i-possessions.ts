import { FormGroupType } from '../../../interfaces/form-group-type'
import { v4 } from 'uuid'

export interface IPossession {
    id: string
    name: string
    description: string
    quantity: number
    weight: number
}

export interface IPossessionForm extends FormGroupType<IPossession> {}

export const initialPossessionState: IPossession[] = []

export const emptyPossession: IPossession = {
    id: v4(),
    name: '',
    description: '',
    quantity: 1,
    weight: 0,
}
