import { FormGroupType } from '../../../interfaces/form-group-type'
import { Ability } from '../../abilities/interfaces/i-abilities'

export interface ISavingThrows {
    fortitude: ISavingThrowsDef | null
    reflex: ISavingThrowsDef | null
    will: ISavingThrowsDef | null
}

export interface ISavingThrowsDef {
    total: number | null
    base: number | null
    ability: number | null
    abilityName: Ability
    magic: number | null
    misc: number | null
    temporary: number | null
}
export interface ISavingThrowsForm extends FormGroupType<ISavingThrows> {}
export interface ISavingThrowsDefForm extends FormGroupType<ISavingThrowsDef> {}

export const initialSavingThrowsState: ISavingThrows = {
    fortitude: {
        total: null,
        base: null,
        ability: null,
        abilityName: Ability.CONSTITUTION,
        magic: null,
        misc: null,
        temporary: null,
    },
    reflex: {
        total: null,
        base: null,
        ability: null,
        abilityName: Ability.DEXTERITY,
        magic: null,
        misc: null,
        temporary: null,
    },
    will: {
        total: null,
        base: null,
        ability: null,
        abilityName: Ability.WISDOM,
        magic: null,
        misc: null,
        temporary: null,
    },
}
