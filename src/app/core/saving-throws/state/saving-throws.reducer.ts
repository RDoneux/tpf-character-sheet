import { createReducer, on } from '@ngrx/store'
import { initialSavingThrowsState } from '../interfaces/i-saving-throws'
import { updateAllSavingThrows, updateFortitude, updateReflex, updateWill } from './saving-throws.actions'

export const savingThrowsReducer = createReducer(
    initialSavingThrowsState,
    on(updateAllSavingThrows, (state, { savingThrows }) => ({
        ...state,
        ...savingThrows,
    })),
    on(updateFortitude, (state, { fortitude }) => ({
        ...state,
        fortitude,
    })),
    on(updateReflex, (state, { reflex }) => ({
        ...state,
        reflex,
    })),
    on(updateWill, (state, { will }) => ({
        ...state,
        will,
    }))
)
