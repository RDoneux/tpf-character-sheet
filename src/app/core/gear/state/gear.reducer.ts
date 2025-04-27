import { createReducer, on } from '@ngrx/store'
import { initialGearState } from '../interfaces/i-gear'
import {
    updateGear,
    updateGearArms,
    updateGearFeet,
    updateGearHands,
    updateGearHead,
    updateGearLeftFinger,
    updateGearRightFinger,
    updateGearTorso,
} from './gear.actions'

export const gearReducer = createReducer(
    initialGearState,
    on(updateGear, (state, { gear }) => ({
        ...state,
        ...gear,
    })),
    on(updateGearArms, (state, { arms }) => ({
        ...state,
        arms,
    })),
    on(updateGearHands, (state, { hands }) => ({
        ...state,
        hands,
    })),
    on(updateGearLeftFinger, (state, { leftFinger }) => ({
        ...state,
        leftFinger,
    })),
    on(updateGearRightFinger, (state, { rightFinger }) => ({
        ...state,
        rightFinger,
    })),
    on(updateGearFeet, (state, { feet }) => ({
        ...state,
        feet,
    })),
    on(updateGearTorso, (state, { torso }) => ({
        ...state,
        torso,
    })),
    on(updateGearHead, (state, { head }) => ({
        ...state,
        head,
    }))
)
