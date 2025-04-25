import { FormGroupType } from '../../../interfaces/form-group-type'

export interface IInitiative {
    total: number | null
    dexterityModifier: number | null
    miscModifier: number | null
}

export interface IInitiativeForm extends FormGroupType<IInitiative> {}

export const initialInitiativeState: IInitiative = {
    total: null,
    dexterityModifier: null,
    miscModifier: null,
}
