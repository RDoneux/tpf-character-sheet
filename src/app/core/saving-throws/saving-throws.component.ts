import { Component, DestroyRef } from '@angular/core'
import {
    initialSavingThrowsState,
    ISavingThrows,
    ISavingThrowsDef,
    ISavingThrowsForm,
} from './interfaces/i-saving-throws'
import { Store } from '@ngrx/store'
import { debounceTime, firstValueFrom, map, Observable } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormGroup } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { updateAllSavingThrows } from './state/saving-throws.actions'
import { UpperCasePipe } from '@angular/common'
import { SectionTitleComponent } from '../../fragments/section-title/section-title.component'
import { MatDialog } from '@angular/material/dialog'
import { SavingThrowsModalComponent } from './fragments/saving-throws-modal/saving-throws-modal.component'
import { IAbilities } from '../abilities/interfaces/i-abilities'

@Component({
    selector: 'app-saving-throws',
    imports: [UpperCasePipe, SectionTitleComponent],
    templateUrl: './saving-throws.component.html',
    styleUrl: './saving-throws.component.scss',
})
export class SavingThrowsComponent {
    savingThrows$!: Observable<ISavingThrows>
    savingThrowsForm!: FormGroup<ISavingThrowsForm>

    savingThrowsKeys = Object.keys(initialSavingThrowsState) as (keyof ISavingThrows)[]

    get savingThrows(): ISavingThrows {
        return this.savingThrowsForm?.getRawValue() as ISavingThrows
    }

    constructor(
        private store: Store<{ savingThrows: ISavingThrows; abilities: IAbilities }>,
        private destroyRef: DestroyRef,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.savingThrows$ = this.store.select((state: { savingThrows: ISavingThrows }) => state.savingThrows)

        firstValueFrom(this.savingThrows$).then((savingThrows: ISavingThrows) => {
            this.savingThrowsForm = buildForm<ISavingThrows>(savingThrows)
            this.savingThrowsForm.valueChanges
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    debounceTime(200),
                    map((value: Partial<ISavingThrows>) => this.calculateTotal(value))
                )
                .subscribe((value: ISavingThrows) => {
                    this.store.dispatch(updateAllSavingThrows({ savingThrows: value as ISavingThrows }))
                })

            const abilities$ = this.store.select((state: { abilities: IAbilities }) => state.abilities)
            abilities$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((abilities: IAbilities) => {
                this.updateAbilityModifiers(savingThrows, abilities)
            })
        })

        this.savingThrows$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: ISavingThrows) => {
            this.savingThrowsForm?.patchValue(value, { emitEvent: false })
        })
    }

    onOpenSavingThrowDialog(savingThrow: keyof ISavingThrows) {
        this.dialog.open(SavingThrowsModalComponent, {
            data: { form: this.savingThrowsForm.get(savingThrow), key: savingThrow },
        })
    }

    private updateAbilityModifiers(savingThrow: ISavingThrows, abilities: IAbilities): void {
        const { fortitude, reflex, will } = this.savingThrowsForm?.getRawValue() as ISavingThrows
        const { constitution, dexterity, wisdom } = abilities

        this.savingThrowsForm.patchValue({
            fortitude: { ...fortitude, ability: constitution?.modifier ?? 0 } as ISavingThrowsDef,
            reflex: { ...reflex, ability: dexterity?.modifier ?? 0 } as ISavingThrowsDef,
            will: { ...will, ability: wisdom?.modifier ?? 0 } as ISavingThrowsDef,
        })
    }

    private calculateTotal(savingThrow: Partial<ISavingThrows>): ISavingThrows {
        Object.keys(savingThrow).forEach((key) => {
            const targetSavingThrow = savingThrow[key as keyof ISavingThrows] as ISavingThrowsDef
            targetSavingThrow.total = 0
            targetSavingThrow.total = Object.values(targetSavingThrow).reduce((acc, value) => {
                if (typeof value === 'number') {
                    return acc + (value ?? 0)
                }
                return acc
            }, 0)
        })

        return savingThrow as ISavingThrows
    }
}
