import { Component, DestroyRef, Inject, signal, WritableSignal } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { IPossession, IPossessionForm } from '../../interfaces/i-possessions'
import { buildForm } from '../../../../utils/form'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Store } from '@ngrx/store'
import { addPossession, updatePossession } from '../../state/possessions.actions'
import { debounceTime } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
    selector: 'app-possession-modal',
    imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule],
    templateUrl: './possession-modal.component.html',
    styleUrl: './possession-modal.component.scss',
})
export class PossessionModalComponent {
    form: FormGroup<IPossessionForm>
    possession: WritableSignal<IPossession>
    isNew: WritableSignal<boolean> = signal(false)

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { possession: IPossession; isNew: boolean },
        private store: Store<{ possessions: IPossession[] }>,
        private destroyRef: DestroyRef
    ) {
        this.form = buildForm<IPossession>(data.possession)
        this.possession = signal(data.possession)
        this.isNew.set(data.isNew)
    }

    ngOnInit() {
        this.form.valueChanges
            .pipe(debounceTime(200), takeUntilDestroyed(this.destroyRef))
            .subscribe((value: Partial<IPossession>) => {
                this.store.dispatch(
                    this.isNew()
                        ? addPossession({ possession: value as IPossession })
                        : updatePossession({ possession: value as IPossession })
                )
                this.isNew.set(false)
            })
    }
}
