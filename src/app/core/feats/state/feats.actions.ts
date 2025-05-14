import { createAction, props } from '@ngrx/store'
import { IFeat } from '../interfaces/i-feat'

export const addFeat = createAction('[Feats] Add Feat', props<{ feat: IFeat }>())

export const updateFeat = createAction('[Feats] Update Feat', props<{ feat: IFeat }>())

export const removeFeat = createAction('[Feats] Remove Feat', props<{ featId: string }>())
