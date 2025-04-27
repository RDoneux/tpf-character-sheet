import { FormGroupType } from '../../../interfaces/form-group-type'

export interface IArmourClass {
    total: number | null
    gearBonus: number | null
    dexterityModifier: number | null
    sizeModifier: number | null
    naturalArmour: number | null
    deflectionModifier: number | null
    miscModifier: number | null
    damageReduction: number | null
}
export interface IArmourClassForm extends FormGroupType<IArmourClass> {}

export const initialArmourClassState: IArmourClass = {
    total: null,
    gearBonus: null,
    dexterityModifier: null,
    sizeModifier: null,
    naturalArmour: null,
    deflectionModifier: null,
    miscModifier: null,
    damageReduction: null,
}
