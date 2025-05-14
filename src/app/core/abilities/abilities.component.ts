import { Component, DestroyRef } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAbilities, IAbilitiesForm, IAbilityDef, initialAbilityState } from './interfaces/i-abilities'
import { debounceTime, firstValueFrom, map, Observable } from 'rxjs'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { UpperCasePipe } from '@angular/common'
import { updateAllAbilities } from './state/abilities.actions'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { SettingsService } from '../../services/settings/settings.service'
import { AutoCalculatedInputDirective } from '../../directives/auto-calculated-input.directive'

@Component({
    selector: 'app-abilities',
    imports: [ReactiveFormsModule, UpperCasePipe, AutoCalculatedInputDirective],
    templateUrl: './abilities.component.html',
    styleUrl: './abilities.component.scss',
})
export class AbilitiesComponent {
    constructor(
        private store: Store<{ abilities: IAbilities }>,
        private destroyRef: DestroyRef,
        private settingsService: SettingsService
    ) {}

    abilities$!: Observable<IAbilities>

    abilitiesForm!: FormGroup<IAbilitiesForm>
    abilities = Object.keys(initialAbilityState)

    ngOnInit() {
        this.abilities$ = this.store.select((state: { abilities: IAbilities }) => state.abilities)

        firstValueFrom(this.abilities$).then((abilities: IAbilities) => {
            this.abilitiesForm = buildForm<IAbilities>(abilities)
            this.abilitiesForm.valueChanges
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    debounceTime(200),
                    map((value) => this.mapModifiers(value))
                )
                .subscribe((value: IAbilities) => {
                    this.store.dispatch(updateAllAbilities({ abilities: value as IAbilities }))
                })
        })

        this.abilities$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IAbilities) => {
            this.abilitiesForm?.patchValue(value, { emitEvent: false })
        })
    }

    private mapModifiers(value: Partial<IAbilities>): IAbilities {
        if (!this.settingsService.autoCalculateFields) return value as IAbilities

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
