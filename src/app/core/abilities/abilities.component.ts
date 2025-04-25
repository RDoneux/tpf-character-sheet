import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAbilities } from './interfaces/i-abilities'
import { Observable } from 'rxjs'
import { updateStrength } from './state/abilities.actions'

@Component({
    selector: 'app-abilities',
    imports: [],
    templateUrl: './abilities.component.html',
    styleUrl: './abilities.component.scss',
})
export class AbilitiesComponent {
    constructor(private store: Store<{ abilities: IAbilities }>) {}

    abilities$!: Observable<IAbilities>

    ngOnInit() {
        this.abilities$ = this.store.select(
            (state: { abilities: IAbilities }) => state.abilities
        )

        // this.store.dispatch(
        //     updateStrength({
        //         strength: {
        //             score: 10,
        //             modifier: 0,
        //             temporaryModifier: 0,
        //             temporaryScore: 0,
        //         },
        //     })
        // )
    }
}
