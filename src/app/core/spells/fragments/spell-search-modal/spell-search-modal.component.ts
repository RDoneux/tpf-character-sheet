import { Component, DestroyRef, output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { SpellService } from '../../services/spell.service'
import { ISpell, SpellSchool } from '../../interfaces/i-spells'
import { debounceTime, map, Observable, startWith } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSelectModule } from '@angular/material/select'

@Component({
    selector: 'app-spell-search-modal',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        AsyncPipe,
        MatSelectModule,
    ],
    templateUrl: './spell-search-modal.component.html',
    styleUrl: './spell-search-modal.component.scss',
})
export class SpellSearchModalComponent {
    spellSelected = output<ISpell>()

    constructor(
        private spellService: SpellService,
        private formBuilder: FormBuilder,
        private destroyRef: DestroyRef,
        private matSnackBar: MatSnackBar
    ) {}

    spells!: ISpell[]
    spellOptions$!: Observable<ISpell[]>
    form!: FormGroup

    get nameSearchValue() {
        return this.form.get('search')?.value || ''
    }

    get schoolSearchValue() {
        return this.form.get('school')?.value || ''
    }

    get spellSchools() {
        return Object.values(SpellSchool)
    }

    ngOnInit() {
        this.spellService
            .getSpells()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (spells: ISpell[]) => (this.spells = spells),
                error: (error: unknown) => {
                    this.matSnackBar.open(`Failed to load spells: ${(error as Error).message}`, 'Close')
                },
            })

        this.form = this.formBuilder.group({
            search: [''],
            school: [''],
        })

        this.spellOptions$ = this.form.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
            debounceTime(300),
            startWith(''),
            map(() => this.filterSpells())
        )
    }

    displaySpell(spell: ISpell): string {
        return spell ? spell.name : ''
    }

    onSelection(spell: ISpell) {
        this.spellSelected.emit(spell)
    }

    private filterSpells(): ISpell[] {
        if (!this.spells) return []
        if (typeof this.nameSearchValue !== 'string') return this.spells
        return this.spells
            .filter((spell: ISpell) => spell.name?.toLowerCase()?.includes(this.nameSearchValue?.toLowerCase()))
            .filter((spell: ISpell) => spell.school?.toLowerCase()?.includes(this.schoolSearchValue?.toLowerCase()))
    }
}
