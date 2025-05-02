import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideStore } from '@ngrx/store'
import { abilitiesReducer } from './core/abilities/state/abilities.reducer'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { hitPointsReducer } from './core/hit-points/state/hit-points.reducer'
import { storageMetaReducer, rehydrateState } from './utils/state'
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
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideStore(appReducers, {
            metaReducers: [storageMetaReducer],
            initialState: rehydrateState(),
        }),
        provideStoreDevtools(),
    ],
}
