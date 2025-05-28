import { createAction, props } from '@ngrx/store'
import { CharacterClassLevel, IBackground } from '../interfaces/i-background'

export const updateBackground = createAction('[Background] Update Background', props<{ background: IBackground }>())

export const updateBackgroundWeight = createAction('[Background] Update Background Weight', props<{ weight: number }>())

export const updateClasses = createAction('[Background] Update Classes', props<{ classes: CharacterClassLevel[] }>())

export const addClass = createAction('[Background] Add Class', props<{ characterClassLevel: CharacterClassLevel }>())

export const removeClass = createAction(
    '[Background] Remove Class',
    props<{ characterClassLevel: CharacterClassLevel }>()
)

export const updateClass = createAction(
    '[Background] Update Class',
    props<{ characterClassLevel: CharacterClassLevel }>()
)
