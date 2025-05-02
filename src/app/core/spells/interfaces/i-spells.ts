import { v4 } from 'uuid'
import { FormGroupType } from '../../../interfaces/form-group-type'

export interface ISpell {
    name: string
    description: string | null
    id: string
    isPrepared: boolean
}

export interface ISpells {
    cantrips: ISpell[]
    firstLevel: ISpell[]
    secondLevel: ISpell[]
    thirdLevel: ISpell[]
    fourthLevel: ISpell[]
    fifthLevel: ISpell[]
    sixthLevel: ISpell[]
    seventhLevel: ISpell[]
    eighthLevel: ISpell[]
    ninthLevel: ISpell[]
}

export interface ISpellsForm extends FormGroupType<ISpells> {}
export interface ISpellForm extends FormGroupType<ISpell[]> {}

export const initialSpellsState: ISpells = {
    cantrips: [
        {
            name: 'Magic Missile',
            description: null,
            id: v4(),
            isPrepared: false,
        },
        {
            name: 'Fireball',
            description: null,
            id: v4(),
            isPrepared: false,
        },
        {
            name: 'Lightning Bolt',
            description: null,
            id: v4(),
            isPrepared: false,
        },
    ],
    firstLevel: [],
    secondLevel: [],
    thirdLevel: [],
    fourthLevel: [],
    fifthLevel: [],
    sixthLevel: [],
    seventhLevel: [],
    eighthLevel: [],
    ninthLevel: [],
}

export const initialSpellState: ISpell = {
    name: '',
    description: null,
    id: v4(),
    isPrepared: false,
}
