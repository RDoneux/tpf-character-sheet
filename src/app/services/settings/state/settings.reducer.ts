import { createReducer, on } from '@ngrx/store'
import { initialSettingsState } from '../interfaces/i-settings'
import { updateAllSettings, updateSomeSettings } from './settings.actions'

export const settingsReducer = createReducer(
    initialSettingsState,
    on(updateAllSettings, (_, { settings }) => ({
        ...settings,
    })),
    on(updateSomeSettings, (state, { settings }) => ({
        ...state,
        ...settings,
    }))
)
