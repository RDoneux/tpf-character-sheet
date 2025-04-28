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

// export const initialPossessionState: IPossession[] = [
//     {
//         id: crypto.randomUUID(),
//         name: 'Mage in a Book',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Something else',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Mage in a Book',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Something else',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Mage in a Book',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Something else',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Mage in a Book',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Something else',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Mage in a Book',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Something else',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Mage in a Book',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Something else',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Mage in a Book',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Something else',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Mage in a Book',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Something else',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Mage in a Book',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Something else',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Mage in a Book',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Something else',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Mage in a Book',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Something else',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Mage in a Book',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
//     {
//         id: crypto.randomUUID(),
//         name: 'Something else',
//         description: '',
//         quantity: 0,
//         weight: 0,
//     },
// ]
