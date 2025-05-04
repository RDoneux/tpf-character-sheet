import { FormGroupType } from '../../../interfaces/form-group-type'

export interface ISettings {
    autoCalculateFields: boolean
}

export interface ISettingsForm extends FormGroupType<ISettings> {}

export const initialSettingsState: ISettings = {
    autoCalculateFields: true,
}
