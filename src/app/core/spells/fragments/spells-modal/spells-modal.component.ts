import { Component, DestroyRef, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ISpell, ISpells, SpellSchool } from '../../interfaces/i-spells'
import { Store } from '@ngrx/store'
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../../../utils/form'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { deleteSpell, updateSpell } from '../../state/spells.actions'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { debounceTime } from 'rxjs'
import { TitleCasePipe } from '../../../../pipes/title-case.pipe'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { ConfirmModalComponent } from '../../../../fragments/confirm-modal/confirm-modal.component'
import { MatSelectModule } from '@angular/material/select'
import { SpellSearchModalComponent } from '../spell-search-modal/spell-search-modal.component'

@Component({
    selector: 'app-spells-modal',
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        TitleCasePipe,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        SpellSearchModalComponent,
    ],
    templateUrl: './spells-modal.component.html',
    styleUrl: './spells-modal.component.scss',
})
export class SpellsModalComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { spell: ISpell; spellLevel: keyof ISpells },
        @Inject(MatDialogRef) private dialogRef: MatDialogRef<SpellsModalComponent>,
        private dialog: MatDialog,
        private store: Store<{ spells: ISpells }>,
        private destroyRef: DestroyRef
    ) {}

    form!: FormGroup
    spellLevel!: keyof ISpells

    get spellKeys() {
        return Object.keys((this.form.get('spells') as FormArray)?.controls)
    }

    get spellSchoolOptions() {
        return Object.values(SpellSchool)
    }

    get spellName(): string {
        return this.data.spell.name
    }

    get spellSchool(): SpellSchool {
        return this.form.get('school')?.getRawValue()
    }

    ngOnInit() {
        this.form = buildForm<ISpell>(this.data.spell)
        this.form.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(200))
            .subscribe((spell: ISpell) => {
                if (this.data.spellLevel) this.store.dispatch(updateSpell({ spell, spellLevel: this.data.spellLevel }))
            })
    }

    onSpellSelected(spell: ISpell) {
        this.form.patchValue(spell)
    }

    onDeleteSpell() {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            data: { title: `Are you sure you want to remove the spell?` },
        })

        dialogRef
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                result && this.deleteSpell()
            })
    }

    private deleteSpell() {
        this.store.dispatch(deleteSpell({ spellLevel: this.data.spellLevel, spellId: this.data.spell.id }))
        this.dialogRef.close()
    }
}
