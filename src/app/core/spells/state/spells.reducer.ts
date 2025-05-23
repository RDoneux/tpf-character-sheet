import { createReducer, on } from '@ngrx/store'
import { initialSpellsState } from '../interfaces/i-spells'
import {
    addSpell,
    deleteSpell,
    updateAllSpells,
    updateSpell,
    updateSpellLevel,
    updateSpellLevelCasts,
} from './spells.actions'

export const spellsReducer = createReducer(
    initialSpellsState,
    on(updateAllSpells, (state, { spells }) => ({
        ...state,
        ...spells,
    })),
    on(updateSpell, (state, { spellLevel, spell }) => ({
        ...state,
        [spellLevel]: {
            ...state[spellLevel],
            spells: state[spellLevel].spells.map((s) => (s.id === spell.id ? { ...s, ...spell } : s)),
        },
    })),
    on(updateSpellLevel, (state, { spellLevel, spells }) => ({
        ...state,
        [spellLevel]: { ...state[spellLevel], ...spells },
    })),
    on(addSpell, (state, { spellLevel, spell }) => {
        return {
            ...state,
            [spellLevel]: { ...state[spellLevel], spells: [...state[spellLevel].spells, spell] },
        }
    }),
    on(updateSpellLevelCasts, (state, { spellLevel, casts }) => ({
        ...state,
        [spellLevel]: { ...state[spellLevel], casts, totalCastsPerDay: casts.length },
    })),
    on(deleteSpell, (state, { spellLevel, spellId }) => ({
        ...state,
        [spellLevel]: {
            ...state[spellLevel],
            spells: state[spellLevel].spells.filter((spell) => spell.id !== spellId),
        },
    }))
)
