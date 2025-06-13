import { createReducer, on } from '@ngrx/store'
import { initialCampState } from '../interfaces/i-camp'
import { leaveCamp, updateCamp, updateCampCode } from './camp.actions'

export const campReducer = createReducer(
    initialCampState,
    on(updateCampCode, (state, { campCode }) => ({
        ...state,
        details: {
            ...state.details,
            code: campCode,
        },
    })),
    on(updateCamp, (state, { camp }) => ({
        ...state,
        ...camp,
    })),
    on(leaveCamp, (state) => ({ ...state, details: initialCampState.details }))
)
