import { v4 } from 'uuid'
import { FormGroup } from '@angular/forms'

export interface IWeapon {
    id: string
    name: string
    attackBonus: number
    damage: string
    critical: string
    range: string
    type: string
    notes: string
    ammunitionType: string
    ammunitionQuantity: number
    ammunitionMaximum?: number
}

export interface IWeaponForm extends FormGroup {}

export const emptyWeaponState: IWeapon = {
    id: v4(),
    name: '',
    attackBonus: 0,
    damage: '',
    critical: '',
    range: '',
    type: '',
    notes: '',
    ammunitionType: '',
    ammunitionQuantity: 0,
    ammunitionMaximum: 20,
}

export const initialWeaponState: IWeapon[] = []
