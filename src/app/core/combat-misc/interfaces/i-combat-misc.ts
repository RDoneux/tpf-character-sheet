import { FormGroupType } from '../../../interfaces/form-group-type'

export interface ICombatMisc {
    baseAttackBonus: number | null
    spellResistance: number | null
    grappleTotal: number | null
    strengthModifier: number | null
    sizeModifier: number | null
    miscModifier: number | null
    temporaryModifier: number | null
}

export interface ICombatMiscForm extends FormGroupType<ICombatMisc> {}

export const initialCombatMiscState: ICombatMisc = {
    baseAttackBonus: 0,
    spellResistance: 0,
    grappleTotal: 0,
    strengthModifier: 0,
    sizeModifier: 0,
    miscModifier: 0,
    temporaryModifier: 0,
}
