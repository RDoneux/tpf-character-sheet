import { createReducer, on } from '@ngrx/store'
import { initialBackgroundState } from '../interfaces/i-background'
import {
    addClass,
    removeClass,
    updateBackground,
    updateBackgroundWeight,
    updateClass,
    updateClasses,
} from './background.actions'

export const backgroundReducer = createReducer(
    initialBackgroundState,
    on(updateBackground, (state, { background }) => ({
        ...state,
        ...background,
    })),
    on(updateBackgroundWeight, (state, { weight }) => ({
        ...state,
        weight,
    })),
    on(updateClasses, (state, { classes }) => ({
        ...state,
        class: classes,
    })),
    on(addClass, (state, { characterClassLevel }) => ({
        ...state,
        classes: [...(state.classes || []), characterClassLevel],
    })),
    on(removeClass, (state, { characterClassLevel }) => ({
        ...state,
        classes: (state.classes || []).filter((c) => c.class !== characterClassLevel.class),
    })),
    on(updateClass, (state, { characterClassLevel }) => ({
        ...state,
        classes: (state.classes || []).map((c) =>
            c.class === characterClassLevel.class ? { ...c, ...characterClassLevel } : c
        ),
    }))
)
