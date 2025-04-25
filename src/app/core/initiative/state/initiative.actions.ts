import { createAction, props } from '@ngrx/store'
import { IInitiative } from '../interfaces/i-initiative'

export const updateInitiative = createAction('[Initiative] Update Initiative', props<{ initiative: IInitiative }>())

export const udpateDexterityModifier = createAction(
    '[Initiative] Update Dexterity Modifier',
    props<{ dexterityModifier: number }>()
)
