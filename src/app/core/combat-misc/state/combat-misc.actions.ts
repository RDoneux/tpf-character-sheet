import { createAction, props } from '@ngrx/store'
import { ICombatMisc } from '../interfaces/i-combat-misc'

export const updateAllCombatMisc = createAction(
    '[Combat Misc] Update All Combat Misc',
    props<{ combatMisc: ICombatMisc }>()
)
