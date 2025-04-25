import { createAction, props } from '@ngrx/store'
import { IHitPoints } from '../interfaces/i-hitpoints'

export const updateHitPoints = createAction('[Hit Points] Update Hit Points', props<{ value: IHitPoints }>())
