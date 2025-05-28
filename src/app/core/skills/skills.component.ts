import { Component, DestroyRef, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import { initialSpecialisationState, ISkill } from './interfaces/i-skills'
import { ReactiveFormsModule } from '@angular/forms'
import { map, Observable } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { SkillsModalComponent } from './fragments/skills-modal/skills-modal.component'
import { IAbilities } from '../abilities/interfaces/i-abilities'
import { addSkill, deleteSkill, updateAllSkills } from './state/skills.actions'
import { CharacterClassLevel, IBackground } from '../background/interfaces/i-background'
import { ClassSkillsMap } from '../../types/modifier-maps'
import { CharacterClass } from '../../types/game'
import { v4 } from 'uuid'
import { SkillTitleComponent } from './fragments/skill-title/skill-title.component'
import { SettingsService } from '../../services/settings/settings.service'

@Component({
    selector: 'app-skills',
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        SkillTitleComponent,
    ],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss',
})
export class SkillsComponent {
    constructor(
        private store: Store<{ skills: ISkill[]; abilities: IAbilities; background: IBackground }>,
        private destroyRef: DestroyRef,
        private dialog: MatDialog,
        private settingsService: SettingsService
    ) {}

    @ViewChild(MatSort) sort!: MatSort

    skills$!: Observable<ISkill[]>
    displayedColumns: string[] = ['name', 'skillModifier', 'abilityModifier', 'ranks', 'miscModifier']
    dataSource = new MatTableDataSource<ISkill>([])

    ngOnInit() {
        this.skills$ = this.store.select((state: { skills: ISkill[] }) => state.skills)
        this.dataSource.sort = this.sort
        this.skills$
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                map((skill: ISkill[]) => this.calculateSkillModifier(skill)),
                map((skills: ISkill[]) => skills.sort((a, b) => a.name.localeCompare(b.name)))
            )
            .subscribe((value: Partial<ISkill>[]) => {
                this.dataSource.data = value as ISkill[]
            })

        if (!this.settingsService.settings().autoCalculateFields) return

        const abilities$ = this.store.select((state: { abilities: IAbilities }) => state.abilities)
        abilities$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: Partial<IAbilities>) => {
            const skillsWithAbilities: ISkill[] = this.dataSource.data.map((skill: ISkill) => ({
                ...skill,
                abilityModifier: value[skill.keyAbility]?.modifier ?? 0,
            }))
            this.store.dispatch(updateAllSkills({ skills: skillsWithAbilities }))
        })

        const background$ = this.store.select((state: { background: IBackground }) => state.background)
        background$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: Partial<IBackground>) => {
            if (!value.classes) return
            const skillsWithBackground: ISkill[] = this.dataSource.data.map((skill: ISkill) => ({
                ...skill,
                isClassSkill:
                    value.classes?.some((clazz: CharacterClassLevel) =>
                        ClassSkillsMap[clazz.class].includes(skill.name)
                    ) ?? false,
            }))
            this.store.dispatch(updateAllSkills({ skills: skillsWithBackground }))
        })
    }

    calculateSkillModifier(skill: ISkill[]): ISkill[] {
        if (!this.settingsService.settings().autoCalculateFields) return skill

        return skill.map((skill: ISkill) => {
            const ranks = skill.ranks
            const abilityModifier = skill.abilityModifier
            const miscModifier = skill.miscModifier
            return { ...skill, skillModifier: ranks + abilityModifier + miscModifier }
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
        this.dataSource.filter = filterValue.trim().toLowerCase()
    }

    openSkillDialog(skill: ISkill) {
        this.dialog.open(SkillsModalComponent, { data: { skill } })
    }

    onAddSkill(skill: ISkill) {
        this.store.dispatch(
            addSkill({
                skill: { ...skill, specialisation: { ...initialSpecialisationState, canDelete: true }, id: v4() },
            })
        )
    }
    onDeleteSkill(id: string) {
        this.store.dispatch(deleteSkill({ id }))
    }
}
