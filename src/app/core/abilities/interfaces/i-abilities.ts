import { FormGroupType } from '../../../interfaces/form-group-type'

export const Ability = {
    STRENGTH: 'strength',
    DEXTERITY: 'dexterity',
    CONSTITUTION: 'constitution',
    INTELLIGENCE: 'intelligence',
    WISDOM: 'wisdom',
    CHARISMA: 'charisma',
} as const
export type Ability = (typeof Ability)[keyof typeof Ability]

export interface IAbilityDef {
    score: number | null
    modifier: number | null
    temporaryScore: number | null
    temporaryModifier: number | null
}

export interface IAbilities {
    strength: IAbilityDef | null
    dexterity: IAbilityDef | null
    constitution: IAbilityDef | null
    intelligence: IAbilityDef | null
    wisdom: IAbilityDef | null
    charisma: IAbilityDef | null
}

export interface IAbilitiesForm extends FormGroupType<IAbilities> {}
