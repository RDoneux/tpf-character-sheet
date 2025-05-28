import { Component, DestroyRef, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core'
import { IExperience, IExperienceForm } from './interfaces/i-experience'
import { Store } from '@ngrx/store'
import { combineLatest, debounceTime, firstValueFrom, merge, Observable, take } from 'rxjs'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
    updateExperience,
    updateExperienceLevel,
    updateExperiencePoints,
    updateExperienceThreshold,
} from './state/experience.actions'
import { AsyncPipe, JsonPipe } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { calculateLevelFromExperience } from '../../utils/game'
import { CharacterExperienceTable } from '../../types/game'
import { CharacterClassLevel, IBackground } from '../background/interfaces/i-background'
import { MatIconModule } from '@angular/material/icon'
import { updateClass } from '../background/state/background.actions'

@Component({
    selector: 'app-experience',
    imports: [AsyncPipe, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
    constructor(
        private store: Store<{ experience: IExperience; background: IBackground }>,
        private destroyRef: DestroyRef,
        private dialog: MatDialog
    ) {}

    @ViewChild('experienceDialog') experienceDialog!: TemplateRef<any>

    experience$!: Observable<IExperience>
    background$!: Observable<IBackground>
    experienceForm!: FormGroup<IExperienceForm>

    addExperienceAmount: WritableSignal<number> = signal(100)
    assignedLevels: WritableSignal<number> = signal(0)

    get experience(): IExperience {
        return this.experienceForm.getRawValue() as IExperience
    }

    ngOnInit() {
        this.experience$ = this.store.select((state: { experience: IExperience }) => state.experience)

        firstValueFrom(this.experience$).then((experience: IExperience) => {
            this.experienceForm = buildForm<IExperience>(experience)
            this.experienceForm.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(200))
                .subscribe((value: Partial<IExperience>) => {
                    this.store.dispatch(updateExperience({ experience: value as IExperience }))
                })

            this.background$ = this.store.select((state: { background: IBackground }) => state.background)
            combineLatest([this.experience$, this.background$])
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(([experience, background]) => {
                    this.experienceForm.patchValue(experience, { emitEvent: false })

                    if (background.classes.length === 1) {
                        const targetClass = { ...background.classes[0], level: this.experience.level }
                        if (background.classes[0].level !== this.experience.level) {
                            this.store.dispatch(updateClass({ characterClassLevel: targetClass }))
                        }
                    }

                    const assignedLevels = background.classes.reduce(
                        (total, characterClassLevel) => total + characterClassLevel.level,
                        0
                    )
                    this.assignedLevels.set(assignedLevels)
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

    onIncreaseSubLevel(characterClassLevel: CharacterClassLevel) {
        const newLevel = characterClassLevel.level + 1
        if (newLevel > this.experience.level || this.assignedLevels() >= this.experience.level) return
        this.assignedLevels.update((levels) => levels + 1)
        const updatedCharacterClassLevel: CharacterClassLevel = {
            ...characterClassLevel,
            level: characterClassLevel.level + 1,
        }
        this.store.dispatch(
            updateClass({
                characterClassLevel: updatedCharacterClassLevel,
            })
        )
    }

    onDecreaseSubLevel(characterClassLevel: CharacterClassLevel) {
        const newLevel = characterClassLevel.level - 1
        if (newLevel < 0) return
        this.assignedLevels.update((levels) => levels - 1)
        const updatedCharacterClassLevel: CharacterClassLevel = {
            ...characterClassLevel,
            level: characterClassLevel.level - 1,
        }
        this.store.dispatch(
            updateClass({
                characterClassLevel: updatedCharacterClassLevel,
            })
        )
    }
}
