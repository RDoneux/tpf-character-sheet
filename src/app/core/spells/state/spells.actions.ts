import { createAction, props } from '@ngrx/store'
import { ISpell, ISpellLevel, ISpells } from '../interfaces/i-spells'

export const updateAllSpells = createAction('[Spells] Update All Spells', props<{ spells: ISpells }>())

export const updateSpellLevel = createAction(
    '[Spells] Update Spell Level',
    props<{
        spellLevel: keyof ISpells
        spells: ISpellLevel
    }>()
)

export const updateSpellLevelCasts = createAction(
    '[Spells] Update Spell Level Casts',
    props<{
        spellLevel: keyof ISpells
        casts: boolean[]
    }>()
)

export const addSpell = createAction(
    '[Spells] Add Spell',
    props<{
        spellLevel: keyof ISpells
        spell: ISpell
    }>()
)
