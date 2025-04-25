import { createAction, props } from '@ngrx/store'
import { IArmourClass } from '../interfaces/i-armour-class'

export const updateArmourClass = createAction(
    '[Armour Class] Update Armour Class',
    props<{
        armourClass: IArmourClass
    }>()
)

export const updateDexterityModifier = createAction(
    '[Armour Class] Update Dexterity Modifier',
    props<{
        dexterityModifier: number
    }>()
)
