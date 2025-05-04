import { Component } from '@angular/core'
import { WeaponsComponent } from '../../../../core/weapons/weapons.component'

@Component({
    selector: 'app-weapons-page',
    imports: [WeaponsComponent],
    templateUrl: './weapons-page.component.html',
    styleUrl: './weapons-page.component.scss',
})
export class WeaponsPageComponent {}
