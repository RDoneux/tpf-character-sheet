import { Component } from '@angular/core'
import { AbilitiesComponent } from '../../../../core/abilities/abilities.component'
import { HitPointsComponent } from '../../../../core/hit-points/hit-points.component'
import { ArmourClassComponent } from '../../../../core/armour-class/armour-class.component'
import { InitiativeComponent } from '../../../../core/initiative/initiative.component'
import { SavingThrowsComponent } from '../../../../core/saving-throws/saving-throws.component'
import { CombatMiscComponent } from '../../../../core/combat-misc/combat-misc.component'

@Component({
    selector: 'app-overview',
    imports: [
        AbilitiesComponent,
        HitPointsComponent,
        ArmourClassComponent,
        InitiativeComponent,
        SavingThrowsComponent,
        CombatMiscComponent,
    ],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss',
})
export class OverviewComponent {}
