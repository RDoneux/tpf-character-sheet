import { createAction, props } from '@ngrx/store'
import { IArmourClass } from '../interfaces/i-armour-class'

export const updateArmourClass = createAction(
    '[Armour Class] Update Armour Class',
    props<{
        armourClass: IArmourClass
    }>()
)
