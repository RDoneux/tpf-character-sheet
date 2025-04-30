import { Component, DestroyRef, Inject, signal, WritableSignal } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ISkill, ISkillForm, Skill } from '../../interfaces/i-skills'
import { Store } from '@ngrx/store'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../../../utils/form'
import { updateSkill } from '../../state/skills.actions'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { debounceTime, Observable } from 'rxjs'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { AbbreviateAbilityPipe } from '../../../../pipes/abbreviate-ability.pipe'
import { MatIconModule } from '@angular/material/icon'
import { IExperience } from '../../../experience/interfaces/i-experience'
import {
    CraftSpecialisation,
    KnowledgeSpecialisation,
    PerformSpecialisation,
    ProfessionSpecialisation,
} from '../../../../types/game'
import { MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete'

@Component({
    selector: 'app-skills-modal',
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        AbbreviateAbilityPipe,
        MatIconModule,
        MatAutocompleteModule,
    ],
    templateUrl: './skills-modal.component.html',
    styleUrl: './skills-modal.component.scss',
})
export class SkillsModalComponent {
    form!: FormGroup<ISkillForm>
    skill!: WritableSignal<ISkill>
    maximumLevel: WritableSignal<number> = signal(0)
    optionSource: WritableSignal<string[]> = signal([])
    filteredSpecialisationOptions: WritableSignal<string[]> = signal([])

    get craftOptions(): string[] {
        return Object.values(CraftSpecialisation)
    }

    get knowledgeOptions(): string[] {
        return Object.values(KnowledgeSpecialisation)
    }

    get performOptions(): string[] {
        return Object.values(PerformSpecialisation)
    }

    get ProfessionOptions(): string[] {
        return Object.values(ProfessionSpecialisation)
    }

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

        this.assignAppropropriateFiltredSpecialisationOptions()

        const experience$ = this.store.select((state: { experience: IExperience }) => state.experience)
        experience$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((experience: IExperience) => {
            const modifiedExperienceLevel = experience.level + 3
            this.maximumLevel.set(
                this.skill().isClassSkill ? modifiedExperienceLevel : Math.floor(modifiedExperienceLevel / 2)
            )
        })
    }

    onSpecialisationFilterChange(event: Event) {
        const target: HTMLInputElement = event.target as HTMLInputElement
        this.filteredSpecialisationOptions.set(
            this.optionSource().filter((option) => option.toLowerCase().includes(target.value.toLowerCase()))
        )
    }

    assignAppropropriateFiltredSpecialisationOptions() {
        switch (this.skill().name) {
            case Skill.CRAFT:
                this.optionSource.set(this.craftOptions)
                this.filteredSpecialisationOptions.set(this.craftOptions)
                break
            case Skill.KNOWLEDGE:
                this.optionSource.set(this.knowledgeOptions)
                this.filteredSpecialisationOptions.set(this.knowledgeOptions)
                break
            case Skill.PERFORM:
                this.optionSource.set(this.performOptions)
                this.filteredSpecialisationOptions.set(this.performOptions)
                break
            case Skill.PROFESSION:
                this.optionSource.set(this.ProfessionOptions)
                this.filteredSpecialisationOptions.set(this.ProfessionOptions)
                break
            default:
                this.optionSource.set([])
        }
    }
}
