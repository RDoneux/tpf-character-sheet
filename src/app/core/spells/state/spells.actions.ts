import { createAction, props } from '@ngrx/store'
import { ISpell, ISpells } from '../interfaces/i-spells'

export const updateAllSpells = createAction('[Spells] Update All Spells', props<{ spells: ISpells }>())

export const updateSpellLevel = createAction(
    '[Spells] Update Spell Level',
    props<{
        spellLevel: keyof ISpells
        spells: ISpell[]
    }>()
)

export const addSpell = createAction(
    '[Spells] Add Spell',
    props<{
        spellLevel: keyof ISpells
        spell: ISpell
    }>()
)
