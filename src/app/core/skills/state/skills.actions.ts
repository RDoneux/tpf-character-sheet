import { createAction, props } from '@ngrx/store'
import { ISkill } from '../interfaces/i-skills'

export const updateAllSkills = createAction('[Skills] Update All Skills', props<{ skills: ISkill[] }>())

export const updateSkill = createAction('[Skills] Update Skill', props<{ skill: ISkill }>())
