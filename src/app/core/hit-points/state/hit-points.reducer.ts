import { createReducer, on } from '@ngrx/store'
import { updateCurrentHitPoints, updateHitPoints } from './hit-points.actions'
import { initialHitPointsState } from '../interfaces/i-hitpoints'

export const hitPointsReducer = createReducer(
    initialHitPointsState,
    on(updateHitPoints, (state, { value }) => ({
        ...state,
        ...value,
    })),
    on(updateCurrentHitPoints, (state, { value }) => ({
        ...state,
        currentHitPoints: value,
    }))
)
