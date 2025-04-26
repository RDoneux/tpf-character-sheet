import { FormGroupType } from '../../../interfaces/form-group-type'
import { CharacterAlignment, CharacterClass, CharacterRace, CharacterSize } from '../../../types/game'

export interface IBackground {
    character: string | null
    player: string | null
    description: string | null
    class: CharacterClass | null
    level: number | null
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
    languages: string | null
}

export interface IBackgroundForm extends FormGroupType<IBackground> {}

export const initialBackgroundState: IBackground = {
    character: null,
    player: null,
    description: null,
    class: null,
    level: null,
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
    languages: null,
}
