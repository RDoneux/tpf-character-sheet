import { v4 } from 'uuid'
import { FormGroupType } from '../../../interfaces/form-group-type'

export interface IFeat {
    id: string
    name: string
    description: string
}

export interface IFeatForm extends FormGroupType<IFeat> {}

export const initialFeatState: IFeat[] = []

export const emptyFeat: IFeat = {
    id: v4(),
    name: '',
    description: '',
}
