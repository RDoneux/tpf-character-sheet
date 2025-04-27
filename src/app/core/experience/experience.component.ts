import { Component, DestroyRef, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core'
import { IExperience, IExperienceForm } from './interfaces/i-experience'
import { Store } from '@ngrx/store'
import { firstValueFrom, lastValueFrom, Observable, take } from 'rxjs'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
    updateExperience,
    updateExperienceLevel,
    updateExperiencePoints,
    updateExperienceThreshold,
} from './state/experience.actions'
import { AsyncPipe } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { calculateLevelFromExperience } from '../../utils/game'
import { CharacterExperienceTable } from '../../types/game'

@Component({
    selector: 'app-experience',
    imports: [AsyncPipe, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
    constructor(
        private store: Store<{ experience: IExperience }>,
        private destroyRef: DestroyRef,
        private dialog: MatDialog
    ) {}

    @ViewChild('experienceDialog') experienceDialog!: TemplateRef<any>

    experience$!: Observable<IExperience>
    experienceForm!: FormGroup<IExperienceForm>

    addExperienceAmount: WritableSignal<number> = signal(100)

    get experience(): IExperience {
        return this.experienceForm.getRawValue() as IExperience
    }

    ngOnInit() {
        this.experience$ = this.store.select((state: { experience: IExperience }) => state.experience)

        firstValueFrom(this.experience$).then((experience: IExperience) => {
            this.experienceForm = buildForm<IExperience>(experience)
            this.experienceForm.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((value: Partial<IExperience>) => {
                    this.store.dispatch(updateExperience({ experience: value as IExperience }))
                })

            this.experience$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((experience: IExperience) => {
                this.experienceForm.patchValue(experience, { emitEvent: false })
            })
        })
    }

    async onAddExperience() {
        this.experience$.pipe(take(1)).subscribe((experience: IExperience) => {
            const newExperience = (experience.points ?? 0) + this.addExperienceAmount()
            this.store.dispatch(updateExperiencePoints({ points: newExperience }))

            const newLevel = calculateLevelFromExperience(newExperience)
            this.store.dispatch(updateExperienceLevel({ level: newLevel }))

            const currentLevelThreshold = CharacterExperienceTable[newLevel]
            this.store.dispatch(updateExperienceThreshold({ threshold: currentLevelThreshold }))
        })
    }

    onExperienceAmountChange(event: Event) {
        this.addExperienceAmount.set((event.target as HTMLInputElement).valueAsNumber)
    }

    openExperienceDialog() {
        this.dialog.open(this.experienceDialog)
    }
}
