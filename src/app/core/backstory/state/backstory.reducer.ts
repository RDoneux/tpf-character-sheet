import { createReducer, on } from '@ngrx/store'
import { initialBackstoryState } from '../interfaces/i-backstory'
import { addSignificantEvent, updateAllBackstory } from './backstory.actions'

export const backstoryReducer = createReducer(
    initialBackstoryState,
    on(updateAllBackstory, (state, { backstory }) => ({
        ...state,
        ...backstory,
    })),
    on(addSignificantEvent, (state, { event }) => ({
        ...state,
        significantEvents: [...(Array.isArray(state.significantEvents) ? state.significantEvents : []), event],
    }))
)
