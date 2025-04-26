import { createAction, props } from '@ngrx/store'
import { IBackground } from '../interfaces/i-background'

export const updateBackground = createAction('[Background] Update Background', props<{ background: IBackground }>())
