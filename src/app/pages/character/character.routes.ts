import { Routes } from '@angular/router'

export const routes: Routes = [
    { path: '', redirectTo: '/character/(character-page:overview)', pathMatch: 'full' }, // Correctly targets the named outlet
    {
        path: 'overview',
        outlet: 'character-page',
        loadComponent: () => import('./children/overview/overview.component').then((m) => m.OverviewComponent),
    },
    {
        path: 'background',
        outlet: 'character-page',
        loadComponent: () =>
            import('./children/background-page/background-page.component').then((m) => m.BackgroundPageComponent),
    },
    {
        path: 'gear',
        outlet: 'character-page',
        loadComponent: () => import('./children/gear-page/gear-page.component').then((m) => m.GearPageComponent),
    },
    {
        path: 'possessions',
        outlet: 'character-page',
        loadComponent: () =>
            import('./children/possessions-page/possessions-page.component').then((m) => m.PossessionsPageComponent),
    },
    {
        path: 'skills',
        outlet: 'character-page',
        loadComponent: () => import('./children/skills-page/skills-page.component').then((m) => m.SkillsPageComponent),
    },
    {
        path: 'spells',
        outlet: 'character-page',
        loadComponent: () => import('./children/spells-page/spells-page.component').then((m) => m.SpellsPageComponent),
    },
]
