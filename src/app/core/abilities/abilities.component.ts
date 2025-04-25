import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import {
    IAbilities,
    IAbilitiesForm,
    initialAbilityState,
} from './interfaces/i-abilities'
import { debounceTime, firstValueFrom, Observable } from 'rxjs'
import { IHitPoints } from '../hit-points/interfaces/i-hitpoints'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { UpperCasePipe } from '@angular/common'
import { updateAllAbilities, updateStrength } from './state/abilities.actions'

@Component({
    selector: 'app-abilities',
    imports: [ReactiveFormsModule, UpperCasePipe],
    templateUrl: './abilities.component.html',
    styleUrl: './abilities.component.scss',
})
export class AbilitiesComponent {
    constructor(private store: Store<{ abilities: IAbilities }>) {}

    abilities$!: Observable<IAbilities>
    // hitPoints$!: Observable<IHitPoints>

    abilitiesForm!: FormGroup<IAbilitiesForm>
    abilities = Object.keys(initialAbilityState)

    ngOnInit() {
        this.abilities$ = this.store.select(
            (state: { abilities: IAbilities }) => state.abilities
        )

        firstValueFrom(this.abilities$).then((abilities: IAbilities) => {
            this.abilitiesForm = buildForm<IAbilities>(abilities)
            this.abilitiesForm.valueChanges
                .pipe(debounceTime(200))
                .subscribe((value) => {
                    this.store.dispatch(
                        updateAllAbilities({ abilities: value as IAbilities })
                    )
                })
        })
    }
}
