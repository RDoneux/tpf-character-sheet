import { Component, DestroyRef, TemplateRef, ViewChild } from '@angular/core'
import { IArmourClass, IArmourClassForm, initialArmourClassState } from './interfaces/i-armour-class'
import { Store } from '@ngrx/store'
import { debounceTime, firstValueFrom, map, Observable } from 'rxjs'
import { updateArmourClass } from './state/armour-class.actions'
import { IAbilities } from '../abilities/interfaces/i-abilities'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDialog } from '@angular/material/dialog'
import { ConfigurationBadgeComponent } from '../../fragments/configuration-badge/configuration-badge.component'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { IBackground } from '../background/interfaces/i-background'
import { SizeAmourClassMap } from '../../types/modifier-maps'
import { CharacterSize } from '../../types/game'
import { IGear } from '../gear/interfaces/i-gear'
import { SettingsService } from '../../services/settings/settings.service'
import { AutoCalculatedInputDirective } from '../../directives/auto-calculated-input.directive'

@Component({
    selector: 'app-armour-class',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        ConfigurationBadgeComponent,
        AutoCalculatedInputDirective,
    ],
    templateUrl: './armour-class.component.html',
    styleUrl: './armour-class.component.scss',
})
export class ArmourClassComponent {
    @ViewChild('armourClassDialog') armourClassDialog!: TemplateRef<any>

    armourClass$!: Observable<IArmourClass>
    armourClassForm!: FormGroup<IArmourClassForm>

    get armourClass(): IArmourClass {
        return this.armourClassForm?.getRawValue() ?? initialArmourClassState
    }

    constructor(
        private store: Store<{
            armourClass: IArmourClass
            abilities: IAbilities
            background: IBackground
            gear: IGear
        }>,
        private dialog: MatDialog,
        private destroyRef: DestroyRef,
        private settingsService: SettingsService
    ) {}

    ngOnInit() {
        this.armourClass$ = this.store.select((state: { armourClass: IArmourClass }) => state.armourClass)

        firstValueFrom(this.armourClass$).then((armourClass: IArmourClass) => {
            this.armourClassForm = buildForm<IArmourClass>(armourClass)
            this.armourClassForm.valueChanges
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    debounceTime(200),
                    map(() => this.calculateArmourClass())
                )
                .subscribe((value: Partial<IArmourClass>) => {
                    this.store.dispatch(updateArmourClass({ armourClass: value as IArmourClass }))
                })

            if (!this.settingsService.settings().autoCalculateFields) return

            const abilities$ = this.store.select((state: { abilities: IAbilities }) => state.abilities)
            abilities$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IAbilities) => {
                this.armourClassForm.patchValue({
                    dexterityModifier: value.dexterity?.modifier,
                })
            })

            const background$ = this.store.select((state: { background: IBackground }) => state.background)
            background$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IBackground) => {
                const { size } = value
                this.armourClassForm.patchValue({
                    sizeModifier: SizeAmourClassMap[size ?? CharacterSize.MEDIUM],
                })
            })

            const gear$ = this.store.select((state: { gear: IGear }) => state.gear)
            gear$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IGear) => {
                this.armourClassForm.patchValue({
                    gearBonus: value.totalArmourClassBonus,
                })
            })
        })

        this.armourClass$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IArmourClass) => {
            this.armourClassForm?.patchValue(value, { emitEvent: false })
        })
    }

    openArmourClassDialog() {
        this.dialog.open(this.armourClassDialog)
    }

    private calculateArmourClass(): IArmourClass {
        const actualValue: Partial<IArmourClass> = { ...this.armourClass }
        if (!this.settingsService.settings().autoCalculateFields) return actualValue as IArmourClass

        actualValue.total = 0
        actualValue.touch = 0
        actualValue.flatFooted = 0

        // calculate total armour class
        const valueToCalculateTotal = { ...actualValue }
        delete valueToCalculateTotal.touch
        delete valueToCalculateTotal.flatFooted
        actualValue.total = Object.values(valueToCalculateTotal).reduce((acc, curr) => {
            return (acc ?? 0) + (curr ?? 0)
        }, 10)

        // calculate touch armour class
        const valueToCalculateTouch = { ...actualValue }
        delete valueToCalculateTouch.naturalArmour
        delete valueToCalculateTouch.gearBonus
        delete valueToCalculateTouch.total
        delete valueToCalculateTouch.flatFooted
        actualValue.touch = Object.values(valueToCalculateTouch).reduce((acc, curr) => {
            return (acc ?? 0) + (curr ?? 0)
        }, 10)

        // calculate flat footed armour class
        const valueToCalculateFlatFooted = { ...actualValue }
        delete valueToCalculateFlatFooted.dexterityModifier
        delete valueToCalculateFlatFooted.touch
        delete valueToCalculateFlatFooted.total
        actualValue.flatFooted = Object.values(valueToCalculateFlatFooted).reduce((acc, curr) => {
            return (acc ?? 0) + (curr ?? 0)
        }, 10)

        return actualValue as IArmourClass
    }
}
