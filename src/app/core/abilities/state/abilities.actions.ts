import { createAction, props } from '@ngrx/store'
import { IAbilities, IAbilityDef } from '../interfaces/i-abilities'

export const updateAllAbilities = createAction('[Abilities] Update All Abilities', props<{ abilities: IAbilities }>())

export const updateStrength = createAction('[Abilities] Update Strength', props<{ strength: IAbilityDef }>())

export const updateDexterity = createAction('[Abilities] Update Dexterity', props<{ dexterity: IAbilityDef }>())

export const updateConstitution = createAction(
    '[Abilities] Update Constitution',
    props<{ constitution: IAbilityDef }>()
)

export const updateIntelligence = createAction(
    '[Abilities] Update Intelligence',
    props<{ intelligence: IAbilityDef }>()
)

export const updateWisdom = createAction('[Abilities] Update Wisdom', props<{ wisdom: IAbilityDef }>())

export const updateCharisma = createAction('[Abilities] Update Charisma', props<{ charisma: IAbilityDef }>())
