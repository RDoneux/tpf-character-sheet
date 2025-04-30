import { Component, DestroyRef, Inject, signal, WritableSignal } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ISkill, ISkillForm } from '../../interfaces/i-skills'
import { Store } from '@ngrx/store'
import { Form, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../../../utils/form'
import { updateSkill } from '../../state/skills.actions'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { debounceTime } from 'rxjs'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { AbbreviateAbilityPipe } from '../../../../pipes/abbreviate-ability.pipe'
import { MatIconModule } from '@angular/material/icon'
import { IBackground } from '../../../background/interfaces/i-background'
import { IExperience } from '../../../experience/interfaces/i-experience'

@Component({
    selector: 'app-skills-modal',
    imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, AbbreviateAbilityPipe, MatIconModule],
    templateUrl: './skills-modal.component.html',
    styleUrl: './skills-modal.component.scss',
})
export class SkillsModalComponent {
    form!: FormGroup<ISkillForm>
    skill!: WritableSignal<ISkill>
    maximumLevel: WritableSignal<number> = signal(0)

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { skill: ISkill },
        private store: Store<{ skills: ISkill[]; experience: IExperience }>,
        private destroyRef: DestroyRef
    ) {}

    ngOnInit() {
        this.skill = signal(this.data.skill)
        this.form = buildForm<ISkill>(this.skill())

        this.form.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(200))
            .subscribe((value: Partial<ISkill>) => {
                this.store.dispatch(updateSkill({ skill: { ...this.skill(), ...value } }))
            })

        const experience$ = this.store.select((state: { experience: IExperience }) => state.experience)
        experience$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((experience: IExperience) => {
            const modifiedExperienceLevel = experience.level + 3
            this.maximumLevel.set(
                this.skill().isClassSkill ? modifiedExperienceLevel : Math.floor(modifiedExperienceLevel / 2)
            )
        })
    }
}
