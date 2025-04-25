import { Component, DestroyRef, TemplateRef, ViewChild } from '@angular/core'
import { IArmourClass, IArmourClassForm, initialArmourClassState } from './interfaces/i-armour-class'
import { Store } from '@ngrx/store'
import { debounceTime, firstValueFrom, map, Observable, take, takeUntil } from 'rxjs'
import { updateArmourClass } from './state/armour-class.actions'
import { IAbilities } from '../abilities/interfaces/i-abilities'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDialog } from '@angular/material/dialog'
import { ConfigurationBadgeComponent } from '../../fragments/configuration-badge/configuration-badge.component'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
    selector: 'app-armour-class',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ConfigurationBadgeComponent],
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
        private store: Store<{ armourClass: IArmourClass; abilities: IAbilities }>,
        private dialog: MatDialog,
        private destroyRef: DestroyRef
    ) {}

    ngOnInit() {
        this.armourClass$ = this.store.select((state: { armourClass: IArmourClass }) => state.armourClass)

        firstValueFrom(this.armourClass$).then((armourClass: IArmourClass) => {
            this.armourClassForm = buildForm<IArmourClass>(armourClass)
            this.armourClassForm.valueChanges
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    debounceTime(200),
                    map((value) => this.calculateArmourClass(value))
                )
                .subscribe((value: Partial<IArmourClass>) => {
                    this.store.dispatch(updateArmourClass({ armourClass: value as IArmourClass }))
                })

            const abilities$ = this.store.select((state: { abilities: IAbilities }) => state.abilities)
            abilities$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IAbilities) => {
                this.armourClassForm.patchValue({
                    dexterityModifier: value.dexterity?.modifier,
                } as Partial<IArmourClass>)
            })
        })

        this.armourClass$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IArmourClass) => {
            this.armourClassForm?.patchValue(value, { emitEvent: false })
        })
    }

    openArmourClassDialog() {
        this.dialog.open(this.armourClassDialog)
    }

    private calculateArmourClass(value: Partial<IArmourClass>): IArmourClass {
        value.total = 0
        value.total = Object.values(value).reduce((acc, curr) => {
            return (acc ?? 0) + (curr ?? 0)
        }, 10)
        return value as IArmourClass
    }
}
