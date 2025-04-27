import { createAction, props } from '@ngrx/store'
import { IExperience } from '../interfaces/i-experience'

export const updateExperience = createAction('[Experience] Update Experience', props<{ experience: IExperience }>())

export const updateExperiencePoints = createAction('[Experience] Update Experience Points', props<{ points: number }>())

export const updateExperienceLevel = createAction('[Experience] Update Experience Level', props<{ level: number }>())

export const updateExperienceThreshold = createAction(
    '[Experience] Update Experience Threshold',
    props<{ threshold: number }>()
)
