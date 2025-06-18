import { FormGroupType } from '../../../interfaces/form-group-type'

export interface ISettings {
    autoCalculateFields: boolean
    autoSave: boolean
    user: IUser | null
}

export interface IUser {
    id: string
    name: string
    email: string
}

export interface ISettingsForm extends FormGroupType<ISettings> {}

export const initialSettingsState: ISettings = {
    autoCalculateFields: true,
    autoSave: true,
    user: null,
}
