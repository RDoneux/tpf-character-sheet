import { Routes } from '@angular/router'
import { CharacterComponent } from './pages/character/character.component'

export const routes: Routes = [
    { path: '', redirectTo: 'character', pathMatch: 'full' },
    {
        path: 'character',
        component: CharacterComponent,
        loadChildren: () => import('./pages/character/character.routes').then((m) => m.routes),
    },
    {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then((m) => m.SettingsComponent),
    },
]
