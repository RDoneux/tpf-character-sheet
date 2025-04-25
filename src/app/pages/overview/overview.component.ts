import { Component } from '@angular/core'
import { AbilitiesComponent } from '../../core/abilities/abilities.component'

@Component({
    selector: 'app-overview',
    imports: [AbilitiesComponent],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss',
})
export class OverviewComponent {}
