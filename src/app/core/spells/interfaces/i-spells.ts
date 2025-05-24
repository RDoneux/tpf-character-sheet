import { v4 } from 'uuid'
import { FormGroupType } from '../../../interfaces/form-group-type'

export const SpellSchool = {
    Abjuration: 'Abjuration',
    Conjuration: 'Conjuration',
    Divination: 'Divination',
    Enchantment: 'Enchantment',
    Evocation: 'Evocation',
    Illusion: 'Illusion',
    Necromancy: 'Necromancy',
    Transmutation: 'Transmutation',
} as const
export type SpellSchool = (typeof SpellSchool)[keyof typeof SpellSchool]

export interface ISpell {
    id: string
    name: string
    isPrepared: boolean
    castingTime: string
    range: string
    components: ISpellComponents
    damage: string
    duration: string
    school: SpellSchool
    description: string | null
}

export interface ISpellComponents {
    verbal: boolean
    somatic: boolean
    material: boolean
    focus: boolean
    divineFocus: boolean
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
    id: v4(),
    name: '',
    isPrepared: false,
    castingTime: '',
    range: '',
    components: {
        verbal: false,
        somatic: false,
        material: false,
        focus: false,
        divineFocus: false,
    },
    damage: '',
    duration: '',
    description: '',
    school: SpellSchool.Divination,
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
