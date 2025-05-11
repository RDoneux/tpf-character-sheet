import { createReducer, on } from '@ngrx/store'
import { initialCampState } from '../interfaces/i-camp'
import { updateCampCode } from './camp.actions'

export const campReducer = createReducer(
    initialCampState,
    on(updateCampCode, (state, { campCode }) => ({
        ...state,
        campCode: campCode,
    }))
)
