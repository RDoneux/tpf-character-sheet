import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { Action, ActionReducer, createAction, props, provideStore } from '@ngrx/store'
import { abilitiesReducer } from './core/abilities/state/abilities.reducer'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { hitPointsReducer } from './core/hit-points/state/hit-points.reducer'
import { storageMetaReducer, rehydrateState, STORAGE_KEY } from './utils/state'
import { armourClassReducer } from './core/armour-class/state/armour-class.reducer'
import { initiativeReducer } from './core/initiative/state/initiative.reducer'
import { savingThrowsReducer } from './core/saving-throws/state/saving-throws.reducer'
import { backgroundReducer } from './core/background/state/background.reducer'
import { experienceReducer } from './core/experience/state/experience.reducer'
import { gearReducer } from './core/gear/state/gear.reducer'
import { moneyReducer } from './core/money/state/money.reducer'
import { posessionsReducer } from './core/possessions/state/possessions.reducer'
import { skillsReducer } from './core/skills/state/skills.reducer'
import { spellsReducer } from './core/spells/state/spells.reducer'
import { weaponsReducer } from './core/weapons/state/weapons.reducer'
import { settingsReducer } from './services/settings/state/settings.reducer'
import { campReducer } from './pages/character/children/camp-page/state/camp.reducer'
import { provideHttpClient } from '@angular/common/http'
import { combatMiscReducer } from './core/combat-misc/state/combat-misc.reducer'
import { featsReducer } from './core/feats/state/feats.reducer'
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'
import { backstoryReducer } from './core/backstory/state/backstory.reducer'
import { summonedCreaturesReducer } from './core/summoned-creatures/state/summoned-creatures.reducer'

export const selectAppState = (state: any) => state

export const importAppState = createAction('[App] Import App State', props<{ state: any }>())
export const resetAppState = createAction('[App] Reset App State')

export function syncStateToLocalStorage<T>(state: T): void {
    for (const sliceName in state) {
        if (Object.prototype.hasOwnProperty.call(state, sliceName)) {
            localStorage.setItem(`${STORAGE_KEY}${sliceName}`, JSON.stringify(state[sliceName]))
        }
    }
}

export function importAppStateMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action: Action) => {
        if (action.type === importAppState.type) {
            // Replace the state with the imported state
            const newState = (action as any).state
            syncStateToLocalStorage(newState)
            return newState
        }
        return reducer(state, action)
    }
}

export function resetMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        console.log(action.type)
        if (action.type === resetAppState.type) {
            // Clear localStorage for all slices except settings
            Object.keys(localStorage)
                .filter((key) => key.startsWith(STORAGE_KEY) && !key.includes('settings'))
                .forEach((key) => (console.log(key), localStorage.removeItem(key)))
            // Return the initial state
            return reducer({ settings: state.settings }, action)
        }
        return reducer(state, action)
    }
}

const appReducers = {
    abilities: abilitiesReducer,
    hitPoints: hitPointsReducer,
    armourClass: armourClassReducer,
    initiative: initiativeReducer,
    savingThrows: savingThrowsReducer,
    background: backgroundReducer,
    experience: experienceReducer,
    gear: gearReducer,
    money: moneyReducer,
    possessions: posessionsReducer,
    skills: skillsReducer,
    spells: spellsReducer,
    weapons: weaponsReducer,
    settings: settingsReducer,
    camp: campReducer,
    combatMisc: combatMiscReducer,
    feats: featsReducer,
    backstory: backstoryReducer,
    summonedCreatures: summonedCreaturesReducer,
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideStore(appReducers, {
            metaReducers: [storageMetaReducer, importAppStateMetaReducer, resetMetaReducer],
            initialState: rehydrateState(),
        }),
        provideStoreDevtools(),
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                maxHeight: '90vh',
                width: '90vw',
            },
        },
    ],
}
