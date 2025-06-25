import { FormGroupType } from '../../../interfaces/form-group-type'

export interface ISettings {
    autoCalculateFields: boolean
    autoSave: boolean
    user: IUser | null
}

export interface IUser {
    name: string
    email: string
    characters: ICharacterSummary[]
}

export interface ICharacterSummary {
    name: string
    id: string
    classes: string[]
    level: number
}

export interface ISettingsForm extends FormGroupType<ISettings> {}

export const initialSettingsState: ISettings = {
    autoCalculateFields: true,
    autoSave: true,
    user: null,
}
