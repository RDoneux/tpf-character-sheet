import { FormGroupType } from '../../../interfaces/form-group-type'

export interface IHitPoints {
    totalHitPoints: Number | null
    currentHitPoints: Number | null
    nonLethalDamage: Number | null
}

export interface IHitPointsForm extends FormGroupType<IHitPoints> {}

export const initialHitPointsState: IHitPoints = {
    totalHitPoints: null,
    currentHitPoints: null,
    nonLethalDamage: null,
}
