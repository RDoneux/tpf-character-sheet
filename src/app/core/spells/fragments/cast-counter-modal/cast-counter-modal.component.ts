import { Component, DestroyRef, Inject } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ISpell, ISpells } from '../../interfaces/i-spells'
import { Store } from '@ngrx/store'
import { debounceTime, firstValueFrom, Observable } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { updateSpellLevelCasts } from '../../state/spells.actions'

@Component({
    selector: 'app-cast-counter-modal',
    imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule],
    templateUrl: './cast-counter-modal.component.html',
    styleUrl: './cast-counter-modal.component.scss',
})
export class CastCounterModalComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { spellLevel: keyof ISpells },
        private store: Store<{ spells: ISpells }>,
        private destroyRef: DestroyRef
    ) {}

    spells$!: Observable<ISpells>
    form = new FormGroup({
        totalCastsPerDay: new FormControl(),
    })

    ngOnInit() {
        this.spells$ = this.store.select((state: { spells: ISpells }) => state.spells)

        firstValueFrom(this.spells$).then((spells: ISpells) => {
            this.form.patchValue({
                totalCastsPerDay: spells[this.data.spellLevel].totalCastsPerDay,
            })

            this.form.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(200))
                .subscribe((value: Partial<{ totalCastsPerDay: number | null }>) =>
                    this.store.dispatch(
                        updateSpellLevelCasts({
                            spellLevel: this.data.spellLevel,
                            casts: Array.from({ length: value.totalCastsPerDay ?? 0 }).map(() => false),
                        })
                    )
                )
        })
    }
}
