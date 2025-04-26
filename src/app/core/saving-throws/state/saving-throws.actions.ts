import { createAction, props } from '@ngrx/store'
import { ISavingThrows, ISavingThrowsDef } from '../interfaces/i-saving-throws'

export const updateAllSavingThrows = createAction(
    '[Saving Throws] Update All Saving Throws',
    props<{ savingThrows: ISavingThrows }>()
)
export const updateFortitude = createAction(
    '[Saving Throws] Update Fortitude',
    props<{ fortitude: ISavingThrowsDef }>()
)
export const updateReflex = createAction('[Saving Throws] Update Reflex', props<{ reflex: ISavingThrowsDef }>())
export const updateWill = createAction('[Saving Throws] Update Will', props<{ will: ISavingThrowsDef }>())
