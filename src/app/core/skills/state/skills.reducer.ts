import { createReducer, on } from '@ngrx/store'
import { updateAllSkills, updateSkill } from './skills.actions'
import { initialSkillState } from '../interfaces/i-skills'

export const skillsReducer = createReducer(
    initialSkillState,
    on(updateAllSkills, (_, { skills }) => skills),
    on(updateSkill, (state, { skill }) =>
        state.map((targetSkill) => (targetSkill.name === skill.name ? skill : targetSkill))
    )
)
