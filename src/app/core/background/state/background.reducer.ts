import { createReducer, on } from '@ngrx/store'
import { initialBackgroundState } from '../interfaces/i-background'
import { updateBackground } from './background.actions'

export const backgroundReducer = createReducer(
    initialBackgroundState,
    on(updateBackground, (state, { background }) => ({
        ...state,
        ...background,
    }))
)
