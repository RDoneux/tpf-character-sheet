import { Component, DestroyRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable, firstValueFrom, debounceTime, map } from 'rxjs'
import { buildForm } from '../../utils/form'
import { IInitiative, IInitiativeForm } from './interfaces/i-initiative'
import { updateInitiative } from './state/initiative.actions'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { IAbilities } from '../abilities/interfaces/i-abilities'
import { ConfigurationBadgeComponent } from '../../fragments/configuration-badge/configuration-badge.component'

@Component({
    selector: 'app-initiative',
    imports: [ConfigurationBadgeComponent],
    templateUrl: './initiative.component.html',
    styleUrl: './initiative.component.scss',
})
export class InitiativeComponent {
    initiative$!: Observable<IInitiative>
    initiativeForm!: FormGroup<IInitiativeForm>

    get initiativeTotal(): number {
        return this.initiativeForm?.getRawValue().total ?? 0
    }

    constructor(
        private store: Store<{ initiative: IInitiative; abilities: IAbilities }>,
        private destroyRef: DestroyRef
    ) {}

    ngOnInit() {
        this.initiative$ = this.store.select((state: { initiative: IInitiative }) => state.initiative)

        firstValueFrom(this.initiative$).then((initiative: IInitiative) => {
            this.initiativeForm = buildForm<IInitiative>(initiative)
            this.initiativeForm.valueChanges
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    debounceTime(200),
                    map((value) => this.calculateInitiative(value))
                )
                .subscribe((value: Partial<IInitiative>) => {
                    this.store.dispatch(updateInitiative({ initiative: value as IInitiative }))
                })

            const abilities$ = this.store.select((state: { abilities: IAbilities }) => state.abilities)
            abilities$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IAbilities) => {
                this.initiativeForm.patchValue({
                    dexterityModifier: value.dexterity?.modifier,
                } as Partial<IInitiative>)
            })
        })

        this.initiative$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IInitiative) => {
            this.initiativeForm?.patchValue(value, { emitEvent: false })
        })
    }

    openInitiativeDialog() {}

    private calculateInitiative(value: Partial<IInitiative>): IInitiative {
        value.total = 0
        value.total = Object.values(value).reduce((acc, curr) => {
            if (typeof curr === 'number') {
                return (acc ?? 0) + (curr ?? 0)
            }
            return acc
        }, 0)
        return value as IInitiative
    }
}
