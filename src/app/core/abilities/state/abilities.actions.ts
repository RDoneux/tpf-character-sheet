import { createAction, props } from '@ngrx/store'
import { IAbilityDef } from '../interfaces/i-abilities'

export const updateStrength = createAction(
    '[Abilities] Update Strength',
    props<{ strength: IAbilityDef }>()
)
