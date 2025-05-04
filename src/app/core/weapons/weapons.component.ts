import { afterNextRender, Component, DestroyRef, inject, Injector, ViewChild } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { firstValueFrom, Observable } from 'rxjs'
import { buildForm } from '../../utils/form'
import { emptyWeaponState, IWeapon, IWeaponForm } from './interfaces/i-weapons'
import { addWeapon, removeWeapon, updateAllWeapons } from './state/weapons.actions'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSliderModule } from '@angular/material/slider'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { v4 } from 'uuid'

@Component({
    selector: 'app-weapons',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSliderModule,
        MatDividerModule,
        MatButtonModule,
    ],
    templateUrl: './weapons.component.html',
    styleUrl: './weapons.component.scss',
})
export class WeaponsComponent {
    private _injector = inject(Injector)

    constructor(
        private store: Store<{ weapons: IWeapon[] }>,
        private destroyRef: DestroyRef
    ) {}

    @ViewChild('autosize') autosize!: CdkTextareaAutosize

    weapons$!: Observable<IWeapon[]>
    weaponsForm!: FormArray<IWeaponForm>

    ngOnInit() {
        this.weapons$ = this.store.select((state: { weapons: IWeapon[] }) => state.weapons)

        firstValueFrom(this.weapons$).then((weapons: IWeapon[]) => {
            const weaponForms: FormGroup[] = weapons.map((weapon) => buildForm<IWeapon>(weapon))
            this.weaponsForm = new FormArray(weaponForms)

            this.weaponsForm.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((value: Partial<IWeapon[]>) => {
                    this.store.dispatch(updateAllWeapons({ weapon: value as IWeapon[] }))
                })
        })

        this.weapons$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IWeapon[]) => {
            this.weaponsForm?.patchValue(value, { emitEvent: false })
        })
    }

    triggerResize() {
        // Wait for content to render, then trigger textarea resize.
        afterNextRender(
            () => {
                this.autosize.resizeToFitContent(true)
            },
            {
                injector: this._injector,
            }
        )
    }

    addWeapon() {
        const weapon: IWeapon = { ...emptyWeaponState, id: v4() }
        this.store.dispatch(addWeapon({ weapon }))
        this.weaponsForm.push(buildForm<IWeapon>(weapon))
    }

    removeWeapon(weaponId: string) {
        this.store.dispatch(removeWeapon({ weaponId }))
        this.weaponsForm.controls = this.weaponsForm.controls.filter((weapon) => weapon.value.id !== weaponId)
    }
}
