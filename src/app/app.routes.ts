import { Routes } from '@angular/router'

export const routes: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    {
        path: 'overview',
        loadComponent: () =>
            import('./pages/overview/overview.component').then(
                (m) => m.OverviewComponent
            ),
    },
]
