import { createAction, props } from '@ngrx/store'
import { IBackstory } from '../interfaces/i-backstory'

export const updateAllBackstory = createAction('[Backstory] Update All Backstory', props<{ backstory: IBackstory }>())

export const addSignificantEvent = createAction('[Backstory] Add Significant Event', props<{ event: string }>())
