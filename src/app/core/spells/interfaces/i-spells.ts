import { v4 } from 'uuid'
import { FormGroupType } from '../../../interfaces/form-group-type'
import { initial } from 'lodash-es'

export interface ISpell {
    name: string
    description: string | null
    id: string
    isPrepared: boolean
}

export interface ISpellLevel {
    casts: boolean[]
    spells: ISpell[]
    totalCastsPerDay: number
}

export interface ISpells {
    cantrips: ISpellLevel
    firstLevel: ISpellLevel
    secondLevel: ISpellLevel
    thirdLevel: ISpellLevel
    fourthLevel: ISpellLevel
    fifthLevel: ISpellLevel
    sixthLevel: ISpellLevel
    seventhLevel: ISpellLevel
    eighthLevel: ISpellLevel
    ninthLevel: ISpellLevel
}

export interface ISpellsForm extends FormGroupType<ISpells> {}
export interface ISpellForm extends FormGroupType<ISpell[]> {}

export const initialSpellState: ISpell = {
    name: '',
    description: null,
    id: v4(),
    isPrepared: false,
}

export const initialSpellLevelState: ISpellLevel = {
    casts: [],
    totalCastsPerDay: 0,
    spells: [],
}

export const initialSpellsState: ISpells = {
    cantrips: initialSpellLevelState,
    firstLevel: initialSpellLevelState,
    secondLevel: initialSpellLevelState,
    thirdLevel: initialSpellLevelState,
    fourthLevel: initialSpellLevelState,
    fifthLevel: initialSpellLevelState,
    sixthLevel: initialSpellLevelState,
    seventhLevel: initialSpellLevelState,
    eighthLevel: initialSpellLevelState,
    ninthLevel: initialSpellLevelState,
}
