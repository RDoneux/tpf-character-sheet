import { FormGroupType } from '../../../interfaces/form-group-type'

export interface IMoney {
    cp: number
    sp: number
    gp: number
    pp: number
}

export interface IMoneyForm extends FormGroupType<IMoney> {}

export const initialMoneyState: IMoney = {
    cp: 0,
    sp: 0,
    gp: 0,
    pp: 0,
}
