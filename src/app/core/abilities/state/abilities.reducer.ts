import { createReducer, on } from '@ngrx/store'
import { initialAbilityState } from '../interfaces/i-abilities'
import {
    updateAllAbilities,
    updateCharisma,
    updateConstitution,
    updateDexterity,
    updateIntelligence,
    updateStrength,
    updateWisdom,
} from './abilities.actions'

export const abilitiesReducer = createReducer(
    initialAbilityState,
    on(updateAllAbilities, (state, { abilities }) => ({
        ...state,
        ...abilities,
    })),
    on(updateStrength, (state, { strength }) => ({
        ...state,
        strength: { ...state.strength, ...strength },
    })),
    on(updateDexterity, (state, { dexterity }) => ({
        ...state,
        dexterity: { ...state.dexterity, ...dexterity },
    })),
    on(updateConstitution, (state, { constitution }) => ({
        ...state,
        constitution: { ...state.constitution, ...constitution },
    })),
    on(updateIntelligence, (state, { intelligence }) => ({
        ...state,
        intelligence: { ...state.intelligence, ...intelligence },
    })),
    on(updateWisdom, (state, { wisdom }) => ({
        ...state,
        wisdom: { ...state.wisdom, ...wisdom },
    })),
    on(updateCharisma, (state, { charisma }) => ({
        ...state,
        charisma: { ...state.charisma, ...charisma },
    }))
)
