import { createReducer, on } from '@ngrx/store'
import { initialSpellsState } from '../interfaces/i-spells'
import { addSpell, updateAllSpells, updateSpellLevel } from './spells.actions'

export const spellsReducer = createReducer(
    initialSpellsState,
    on(updateAllSpells, (state, { spells }) => ({
        ...state,
        ...spells,
    })),
    on(updateSpellLevel, (state, { spellLevel, spells }) => ({
        ...state,
        [spellLevel]: spells,
    })),
    on(addSpell, (state, { spellLevel, spell }) => ({
        ...state,
        [spellLevel]: [...state[spellLevel], spell],
    }))
)
