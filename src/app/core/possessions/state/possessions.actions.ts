import { createAction, props } from '@ngrx/store'
import { IPossession } from '../interfaces/i-possessions'

export const updateAllPossessions = createAction(
    '[Possessions] Update All Possessions',
    props<{ possessions: IPossession[] }>()
)

export const addPossession = createAction('[Possessions] Add Possession', props<{ possession: IPossession }>())

export const updatePossession = createAction('[Possessions] Update Possession', props<{ possession: IPossession }>())

export const deletePossession = createAction('[Possessions] Delete Possession', props<{ possessionId: string }>())
