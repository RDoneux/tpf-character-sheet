import { createAction, props } from '@ngrx/store'

export const updateArmourClassTotal = createAction(
    '[Armour Class] Update Hit Point Total',
    props<{ total: Number }>()
)
