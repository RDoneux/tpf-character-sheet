import { createAction, props } from '@ngrx/store'
import { ISummonedCreature } from '../interfaces/i-summoned-creatures'

export const addSummonedCreature = createAction(
    '[Summoned Creatures] Add Summoned Creature',
    props<{
        summonedCreature: ISummonedCreature
    }>()
)

export const updateSummonedCreature = createAction(
    '[Summoned Creatures] Update Summoned Creature',
    props<{
        summonedCreature: ISummonedCreature
    }>()
)

export const deleteSummonedCreature = createAction(
    '[Summoned Creatures] Delete Summoned Creature',
    props<{
        summonedCreatureId: string
    }>()
)
