import { createReducer, on } from '@ngrx/store'
import { initialCombatMiscState } from '../interfaces/i-combat-misc'
import { updateAllCombatMisc } from './combat-misc.actions'

export const combatMiscReducer = createReducer(
    initialCombatMiscState,
    on(updateAllCombatMisc, (state, { combatMisc }) => ({
        ...state,
        ...combatMisc,
    }))
)
