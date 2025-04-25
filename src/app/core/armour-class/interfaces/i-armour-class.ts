import { FormGroupType } from '../../../interfaces/form-group-type'

export interface IArmourClass {
    total: Number | null
    armourBonus: Number | null
    shieldBonus: Number | null
    dexterityModifier: Number | null
    sizeModifier: Number | null
    naturalArmour: Number | null
    deflectionBonus: Number | null
    miscModifier: Number | null
}
export interface IArmourClassForm extends FormGroupType<IArmourClass> {}

export const initialArmourClassState: IArmourClass = {
    total: null,
    armourBonus: null,
    shieldBonus: null,
    dexterityModifier: null,
    sizeModifier: null,
    naturalArmour: null,
    deflectionBonus: null,
    miscModifier: null,
}
