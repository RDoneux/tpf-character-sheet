import { Component } from '@angular/core'
import { SpellsComponent } from '../../../../core/spells/spells.component'

@Component({
    selector: 'app-spells-page',
    imports: [SpellsComponent],
    templateUrl: './spells-page.component.html',
    styleUrl: './spells-page.component.scss',
})
export class SpellsPageComponent {}
