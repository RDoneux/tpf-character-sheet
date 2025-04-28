import { createReducer, on } from '@ngrx/store'
import { initialPossessionState } from '../interfaces/i-possessions'
import { updateAllPossessions, addPossession, updatePossession, deletePossession } from './possessions.actions'

export const posessionsReducer = createReducer(
    initialPossessionState,
    on(updateAllPossessions, (_, { possessions }) => possessions),
    on(addPossession, (state, { possession }) => [...state, possession]),
    on(updatePossession, (state, { possession }) =>
        state.map((item) => (item.id === possession.id ? possession : item))
    ),
    on(deletePossession, (state, { possessionId }) => state.filter((possession) => possession.id !== possessionId))
)
