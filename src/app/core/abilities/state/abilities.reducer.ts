import { createReducer, on } from '@ngrx/store'
import { initialAbilityState } from '../interfaces/i-abilities'
import { updateStrength } from './abilities.actions'

export const abilitiesReducer = createReducer(
    initialAbilityState,
    on(updateStrength, (state, { strength }) => ({
        ...state,
        strength: { ...state.strength, ...strength },
    }))
)
