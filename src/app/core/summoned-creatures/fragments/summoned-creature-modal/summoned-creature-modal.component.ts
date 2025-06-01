import { Component, DestroyRef, Inject, signal, WritableSignal } from '@angular/core'
import { ISummonedCreature, ISummonedCreaturesForm } from '../../interfaces/i-summoned-creatures'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { buildForm } from '../../../../utils/form'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { debounceTime, map } from 'rxjs'
import { Store } from '@ngrx/store'
import { deleteSummonedCreature, updateSummonedCreature } from '../../state/summoned-creatures.actions'
import { AbbreviateAbilityPipe } from '../../../../pipes/abbreviate-ability.pipe'
import { SectionTitleComponent } from '../../../../fragments/section-title/section-title.component'
import { MatButtonModule } from '@angular/material/button'
import { ConfirmModalComponent } from '../../../../fragments/confirm-modal/confirm-modal.component'

@Component({
    selector: 'app-summoned-creature-modal',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        AbbreviateAbilityPipe,
        SectionTitleComponent,
        MatButtonModule,
    ],
    templateUrl: './summoned-creature-modal.component.html',
    styleUrl: './summoned-creature-modal.component.scss',
})
export class SummonedCreatureModalComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ISummonedCreature,
        @Inject(MatDialogRef) private dialogRef: MatDialogRef<SummonedCreatureModalComponent>,
        private destroyRef: DestroyRef,
        private store: Store<{ summonedCreatures: ISummonedCreature[] }>,
        private dialog: MatDialog
    ) {
        this.summonedCreature = signal<ISummonedCreature>(this.data)
        this.form = buildForm<ISummonedCreature>(this.data)
    }

    form!: FormGroup<ISummonedCreaturesForm>
    summonedCreature!: WritableSignal<ISummonedCreature>

    ngOnInit() {
        this.form.valueChanges
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                debounceTime(300),
                map((value) => this.mapValues(value as ISummonedCreature))
            )
            .subscribe((summonedCreature: ISummonedCreature) => {
                this.store.dispatch(
                    updateSummonedCreature({ summonedCreature: { ...this.summonedCreature(), ...summonedCreature } })
                )
            })
    }

    stripValue(value: string): string {
        return value.split(' ')[0]
    }

    mapValues(value: ISummonedCreature): ISummonedCreature {
        return {
            ...this.summonedCreature(),
            ...value,
            abilities: {
                strength: `${value.abilities?.strength}`,
                dexterity: `${value.abilities?.dexterity}`,
                constitution: `${value.abilities?.constitution}`,
                intelligence: `${value.abilities?.intelligence}`,
                wisdom: `${value.abilities?.wisdom}`,
                charisma: `${value.abilities?.charisma}`,
            },
        }
    }

    onDismissCreature() {
        const confirmModalRef = this.dialog.open(ConfirmModalComponent, {
            data: {
                title: `Dismiss ${this.summonedCreature().name}?`,
                confirmText: 'Dismiss',
            },
        })

        confirmModalRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.dialogRef.close()
                this.store.dispatch(
                    deleteSummonedCreature({
                        summonedCreatureId: this.summonedCreature().id,
                    })
                )
            }
        })
    }
}
