import { Component, DestroyRef } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable, firstValueFrom, debounceTime } from 'rxjs'
import { buildForm } from '../../utils/form'
import { IBackstory, IBackstoryForm } from './interfaces/i-backstory'
import { updateAllBackstory } from './state/backstory.actions'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-backstory',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
    templateUrl: './backstory.component.html',
    styleUrl: './backstory.component.scss',
})
export class BackstoryComponent {
    constructor(
        private store: Store<{ backstory: IBackstory }>,
        private destroyRef: DestroyRef
    ) {}

    backstory$!: Observable<IBackstory>
    backstoryForm!: FormGroup<IBackstoryForm>

    get significantEvents(): string[] {
        return Object.keys((this.backstoryForm.get('significantEvents') as FormArray).controls)
    }

    ngOnInit() {
        this.backstory$ = this.store.select((state: { backstory: IBackstory }) => state.backstory)

        firstValueFrom(this.backstory$).then((backstory: IBackstory) => {
            this.backstoryForm = buildForm<IBackstory>(backstory)
            this.backstoryForm.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(200))
                .subscribe((backstory: Partial<IBackstory>) => {
                    this.store.dispatch(updateAllBackstory({ backstory: backstory as IBackstory }))
                })
        })

        this.backstory$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IBackstory) => {
            this.backstoryForm?.patchValue(value, { emitEvent: false })
        })
    }

    addSignificantEvent() {
        const index = this.significantEvents.length
        ;(this.backstoryForm.get('significantEvents') as FormGroup)?.addControl(`${index}`, new FormControl(''))
    }
}
