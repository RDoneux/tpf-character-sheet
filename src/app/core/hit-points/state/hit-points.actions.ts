import { createAction, props } from '@ngrx/store'

export const updateHitPointsTotal = createAction(
    '[Hit Points] Update Hit Points Total',
    props<{ value: Number }>()
)
