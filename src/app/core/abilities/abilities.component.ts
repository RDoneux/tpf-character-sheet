import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAbilities, IAbilitiesForm, IAbilityDef, initialAbilityState } from './interfaces/i-abilities'
import { debounceTime, firstValueFrom, map, Observable } from 'rxjs'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { UpperCasePipe } from '@angular/common'
import { updateAllAbilities } from './state/abilities.actions'

@Component({
    selector: 'app-abilities',
    imports: [ReactiveFormsModule, UpperCasePipe],
    templateUrl: './abilities.component.html',
    styleUrl: './abilities.component.scss',
})
export class AbilitiesComponent {
    constructor(private store: Store<{ abilities: IAbilities }>) {}

    abilities$!: Observable<IAbilities>

    abilitiesForm!: FormGroup<IAbilitiesForm>
    abilities = Object.keys(initialAbilityState)

    ngOnInit() {
        this.abilities$ = this.store.select((state: { abilities: IAbilities }) => state.abilities)

        firstValueFrom(this.abilities$).then((abilities: IAbilities) => {
            this.abilitiesForm = buildForm<IAbilities>(abilities)
            this.abilitiesForm.valueChanges
                .pipe(
                    debounceTime(200),
                    map((value) => this.mapModifiers(value))
                )
                .subscribe((value: IAbilities) => {
                    this.store.dispatch(updateAllAbilities({ abilities: value as IAbilities }))
                })
        })

        this.abilities$.subscribe((value: IAbilities) => {
            this.abilitiesForm?.patchValue(value, { emitEvent: false })
        })
    }

    private mapModifiers(value: Partial<IAbilities>): IAbilities {
        Object.keys(value).forEach((key: string) => {
            const abilityTarget = value[key as keyof IAbilities] as IAbilityDef
            abilityTarget.modifier = this.calculateModifier(abilityTarget.score)
        })
        return value as IAbilities
    }

    private calculateModifier(value: number | null): number {
        return value ? Math.floor((value - 10) / 2) : 0
    }
}
