import { createAction, props } from '@ngrx/store'
import { ICamp } from '../interfaces/i-camp'

export const updateCampCode = createAction('[Camp] Update Camp Code', props<{ campCode: string | null }>())
export const updateCamp = createAction('[Camp] Update Camp', props<{ camp: ICamp }>())
export const leaveCamp = createAction('[Camp] Leave Camp')
