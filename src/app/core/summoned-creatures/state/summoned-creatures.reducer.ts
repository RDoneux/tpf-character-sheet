import { createReducer, on } from '@ngrx/store'
import { initialSummonedCreeatureState } from '../interfaces/i-summoned-creatures'
import { addSummonedCreature, updateSummonedCreature, deleteSummonedCreature } from './summoned-creatures.actions'

export const summonedCreaturesReducer = createReducer(
    initialSummonedCreeatureState,
    on(addSummonedCreature, (state, { summonedCreature }) => [...state, summonedCreature]),
    on(updateSummonedCreature, (state, { summonedCreature }) =>
        state.map((sc) => (sc.id === summonedCreature.id ? { ...sc, ...summonedCreature } : sc))
    ),
    on(deleteSummonedCreature, (state, { summonedCreatureId }) => state.filter((sc) => sc.id !== summonedCreatureId))
)
