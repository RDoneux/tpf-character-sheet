import { createAction, props } from '@ngrx/store'

export const updateCampCode = createAction('[Camp] Update Camp Code', props<{ campCode: string | null }>())
