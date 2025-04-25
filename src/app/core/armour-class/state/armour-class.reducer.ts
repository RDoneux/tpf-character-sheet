import { createReducer, on } from '@ngrx/store'
import { initialArmourClassState } from '../interfaces/i-armour-class'
import { updateArmourClass, updateDexterityModifier } from './armour-class.actions'

export const armourClassReducer = createReducer(
    initialArmourClassState,
    on(updateArmourClass, (state, { armourClass }) => ({
        ...state,
        ...armourClass,
    })),
    on(updateDexterityModifier, (state, { dexterityModifier }) => ({
        ...state,
        dexterityModifier,
    }))
)
