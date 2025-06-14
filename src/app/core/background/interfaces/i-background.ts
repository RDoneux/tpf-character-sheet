import { v4 } from 'uuid'
import { FormGroupType } from '../../../interfaces/form-group-type'
import { CharacterAlignment, CharacterClass, CharacterRace, CharacterSize } from '../../../types/game'

export interface CharacterClassLevel {
    class: CharacterClass
    level: number
}

export interface IBackground {
    id: string
    character: string | null
    player: string | null
    description: string | null
    classes: CharacterClassLevel[]
    race: CharacterRace | null
    alignment: CharacterAlignment | null
    deity: string | null
    size: CharacterSize | null
    age: number | null
    height: number | null
    weight: number | null
    gender: string | null
    eyes: string | null
    hair: string | null
    skin: string | null
}

export interface IBackgroundForm extends FormGroupType<IBackground> {}

export const initialBackgroundState: IBackground = {
    id: v4(),
    character: null,
    player: null,
    description: null,
    classes: [],
    race: null,
    alignment: null,
    deity: null,
    size: null,
    age: null,
    height: null,
    weight: null,
    gender: null,
    eyes: null,
    hair: null,
    skin: null,
}
