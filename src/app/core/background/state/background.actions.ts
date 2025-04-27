import { createAction, props } from '@ngrx/store'
import { IBackground } from '../interfaces/i-background'

export const updateBackground = createAction('[Background] Update Background', props<{ background: IBackground }>())

export const updateBackgroundWeight = createAction('[Background] Update Background Weight', props<{ weight: number }>())
