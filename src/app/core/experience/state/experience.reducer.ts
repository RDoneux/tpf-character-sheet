import { createReducer, on } from '@ngrx/store'
import { initialExperienceState } from '../interfaces/i-experience'
import {
    updateExperience,
    updateExperienceLevel,
    updateExperiencePoints,
    updateExperienceThreshold,
} from './experience.actions'

export const experienceReducer = createReducer(
    initialExperienceState,
    on(updateExperience, (state, { experience }) => ({
        ...state,
        ...experience,
    })),
    on(updateExperiencePoints, (state, { points }) => ({
        ...state,
        points,
    })),
    on(updateExperienceLevel, (state, { level }) => ({
        ...state,
        level,
    })),
    on(updateExperienceThreshold, (state, { threshold }) => ({
        ...state,
        currentLevelThreshold: threshold,
    }))
)
