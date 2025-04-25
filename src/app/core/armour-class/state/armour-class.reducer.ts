import { createReducer, on } from '@ngrx/store'
import { initialArmourClassState } from '../interfaces/i-armour-class'
import { updateArmourClassTotal } from './armour-class.actions'

export const armourClassReducer = createReducer(
    initialArmourClassState,
    on(updateArmourClassTotal, (state, { total }) => ({
        ...state,
        total: total,
    }))
)
