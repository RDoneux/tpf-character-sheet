import { createReducer, on } from '@ngrx/store'
import { addSkill, deleteSkill, updateAllSkills, updateSkill } from './skills.actions'
import { initialSkillState } from '../interfaces/i-skills'

export const skillsReducer = createReducer(
    initialSkillState,
    on(updateAllSkills, (_, { skills }) => skills),
    on(updateSkill, (state, { skill }) =>
        state.map((targetSkill) => (targetSkill.id === skill.id ? skill : targetSkill))
    ),
    on(addSkill, (state, { skill }) => [...state, skill]),
    on(deleteSkill, (state, { id }) => state.filter((skill) => skill.id !== id))
)
