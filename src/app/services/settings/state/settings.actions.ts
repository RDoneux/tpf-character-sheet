import { createAction, props } from '@ngrx/store'
import { ISettings } from '../interfaces/i-settings'

export const updateAllSettings = createAction('[Settings] Update All Settings', props<{ settings: ISettings }>())
export const updateSomeSettings = createAction(
    '[Settings] Update Some Settings',
    props<{ settings: Partial<ISettings> }>()
)
