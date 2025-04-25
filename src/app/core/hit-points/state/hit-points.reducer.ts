import { createReducer, on } from '@ngrx/store'
import { updateHitPointsTotal } from './hit-points.actions'
import { initialHitPointsState } from '../interfaces/i-hitpoints'

export const hitPointsReducer = createReducer(
    initialHitPointsState,
    on(updateHitPointsTotal, (state, value) => ({
        ...state,
        totalHitPoints: value.value,
    }))
)
