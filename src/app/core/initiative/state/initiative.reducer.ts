import { createReducer, on } from '@ngrx/store'
import { initialInitiativeState } from '../interfaces/i-initiative'
import { udpateDexterityModifier, updateInitiative } from './initiative.actions'

export const initiativeReducer = createReducer(
    initialInitiativeState,
    on(updateInitiative, (state, { initiative }) => ({
        ...state,
        ...initiative,
    })),
    on(udpateDexterityModifier, (state, { dexterityModifier }) => ({
        ...state,
        dexterityModifier,
    }))
)
