import { FormGroupType } from '../../../interfaces/form-group-type'
import { CharacterExperienceTable } from '../../../types/game'

export interface IExperience {
    points: number
    level: number
    currentLevelThreshold: number
}

export interface IExperienceForm extends FormGroupType<IExperience> {}

export const initialExperienceState: IExperience = {
    points: 0,
    level: 0,
    currentLevelThreshold: CharacterExperienceTable[1],
}
