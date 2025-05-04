import { Component, DestroyRef } from '@angular/core'
import { IArmourForm, IGear, IGearForm, IProtectiveItem, IProtectiveItemForm, ISheildForm } from './interfaces/i-gear'
import { Store } from '@ngrx/store'
import { firstValueFrom, Observable, debounceTime, map } from 'rxjs'
import { FormGroup } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { updateGear } from './state/gear.actions'
import { BodyOutlineComponent } from './fragments/body-outline/body-outline.component'
import { AsyncPipe } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { GearItemComponent } from './fragments/gear-item/gear-item.component'
import { SettingsService } from '../../services/settings/settings.service'

@Component({
    selector: 'app-gear',
    imports: [BodyOutlineComponent, AsyncPipe, MatIconModule, GearItemComponent],
    templateUrl: './gear.component.html',
    styleUrl: './gear.component.scss',
})
export class GearComponent {
    constructor(
        private store: Store<{ gear: IGear }>,
        private destroyRef: DestroyRef,
        private settingsService: SettingsService
    ) {}

    gear$!: Observable<IGear>
    gearForm!: FormGroup<IGearForm>

    get headForm() {
        return this.gearForm?.get('head') as FormGroup<IProtectiveItemForm>
    }

    get torsoForm() {
        return this.gearForm?.get('torso') as FormGroup<IArmourForm>
    }

    get leftArmForm() {
        return this.gearForm?.get('leftArm') as FormGroup<ISheildForm>
    }

    get rightArmForm() {
        return this.gearForm?.get('rightArm') as FormGroup<ISheildForm>
    }

    get legsForm() {
        return this.gearForm?.get('legs') as FormGroup<IProtectiveItemForm>
    }

    get feetForm() {
        return this.gearForm?.get('feet') as FormGroup<IProtectiveItemForm>
    }

    get leftHandForm() {
        return this.gearForm?.get('leftHand') as FormGroup<IProtectiveItemForm>
    }

    get rightHandForm() {
        return this.gearForm?.get('rightHand') as FormGroup<IProtectiveItemForm>
    }

    ngOnInit() {
        this.gear$ = this.store.select((state: { gear: IGear }) => state.gear)

        firstValueFrom(this.gear$).then((gear: IGear) => {
            this.gearForm = buildForm<IGear>(gear)
            this.gearForm.valueChanges
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    debounceTime(200),
                    map((value: Partial<IGear>) => this.calculateTotalWeight(value)),
                    map((value: Partial<IGear>) => this.calculateTotalArmourClassBonus(value))
                )
                .subscribe((value: Partial<IGear>) => {
                    this.store.dispatch(updateGear({ gear: value as IGear }))
                })

            this.gear$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((gear: IGear) => {
                this.gearForm?.patchValue(gear, { emitEvent: false })
            })
        })
    }

    calculateTotalWeight(gear: Partial<IGear>): IGear {
        if (!this.settingsService.settings().autoCalculateFields) return gear as IGear

        const totalWeight = Object.values(gear).reduce((acc, item) => {
            if (item && typeof item === 'object' && 'weight' in item) {
                const itemWeight: number = item.weight ?? 0
                return (acc as number) + itemWeight
            }
            return acc
        }, 0)
        return { ...gear, totalWeight } as IGear
    }

    calculateTotalArmourClassBonus(gear: Partial<IGear>): IGear {
        if (!this.settingsService.settings().autoCalculateFields) return gear as IGear

        const totalArmourClassBonus = Object.values(gear).reduce((acc, item) => {
            if (item && typeof item === 'object' && 'armourClassBonus' in item) {
                const itemArmourClassBonus: number = item.armourClassBonus ?? 0
                return (acc as number) + itemArmourClassBonus
            }
            return acc
        }, 0)
        return { ...gear, totalArmourClassBonus } as IGear
    }
}
