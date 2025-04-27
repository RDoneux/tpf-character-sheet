import { createAction, props } from '@ngrx/store'
import { IMoney } from '../interfaces/i-money'

export const updateMoney = createAction('[Money] Update Money', props<{ money: IMoney }>())

export const updateCopper = createAction('[Money] Update Copper', props<{ copper: number }>())
export const updateSilver = createAction('[Money] Update Silver', props<{ silver: number }>())
export const updateGold = createAction('[Money] Update Gold', props<{ gold: number }>())
export const updatePlatinum = createAction('[Money] Update Platinum', props<{ platinum: number }>())
