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

const appReducers = {
    abilities: abilitiesReducer,
    hitPoints: hitPointsReducer,
    armourClass: armourClassReducer,
    initiative: initiativeReducer,
    savingThrows: savingThrowsReducer,
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
