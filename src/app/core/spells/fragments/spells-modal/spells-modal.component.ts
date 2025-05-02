import { Component, DestroyRef, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ISpell, ISpells } from '../../interfaces/i-spells'
import { Store } from '@ngrx/store'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../../../utils/form'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { updateSpellLevel } from '../../state/spells.actions'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { debounceTime, firstValueFrom, map, Observable } from 'rxjs'
import { TitleCasePipe } from '../../../../pipes/title-case.pipe'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { v4 } from 'uuid'
import { MatCheckboxModule } from '@angular/material/checkbox'

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
    ],
    templateUrl: './spells-modal.component.html',
    styleUrl: './spells-modal.component.scss',
})
export class SpellsModalComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { spells: ISpell[]; spellLevel: keyof ISpells },
        private store: Store<{ spells: ISpells }>,
        private destroyRef: DestroyRef
    ) {}

    form!: FormGroup
    spells$!: Observable<ISpell[]>

    get spellKeys() {
        return Object.keys((this.form.get('spells') as FormArray)?.controls)
    }

    ngOnInit() {
        this.spells$ = this.store
            .select((state: { spells: ISpells }) => state.spells)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                map((spells: ISpells) => spells[this.data.spellLevel])
            )

        firstValueFrom(this.spells$).then((spells: ISpell[]) => {
            const spellForms = spells.map((spell) => buildForm<ISpell>(spell))
            this.form = new FormGroup({ spells: new FormArray(spellForms) })

            this.form.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(200))
                .subscribe((value: { spells: ISpell[] }) => {
                    this.store.dispatch(updateSpellLevel({ spellLevel: this.data.spellLevel, spells: value.spells }))
                })
        })

        this.spells$.subscribe((spells: ISpell[]) => {
            this.form?.patchValue({ spells }, { emitEvent: false })
        })
    }

    onAddSpell() {
        ;(this.form.get('spells') as FormArray)?.push(
            new FormGroup({
                name: new FormControl(''),
                description: new FormControl(''),
                id: new FormControl(v4()),
                isPrepared: new FormControl(false),
            })
        )
    }

    onDeleteSpell(index: number) {
        const spells = this.form.get('spells') as FormArray
        if (spells) {
            spells.removeAt(index)
            this.form.setControl('spells', spells)
        }
    }
}
