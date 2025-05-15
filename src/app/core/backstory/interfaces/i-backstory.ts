import { FormGroupType } from '../../../interfaces/form-group-type'

export interface IBackstory {
    birthplace: string | null
    socialClass: string | null
    childhood: string | null
    family: string | null
    secrets: string | null
    aspirations: string | null
    otherDetails: string | null
    significantEvents: string[] | null
}

export interface IBackstoryForm extends FormGroupType<IBackstory> {}

export const initialBackstoryState: IBackstory = {
    birthplace: null,
    socialClass: null,
    childhood: null,
    family: null,
    secrets: null,
    aspirations: null,
    otherDetails: null,
    significantEvents: [],
}
