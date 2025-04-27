import { createAction, props } from '@ngrx/store'
import { IArmour, IGear, IProtectiveItem } from '../interfaces/i-gear'

export const updateGear = createAction('[Gear] Update Gear', props<{ gear: Partial<IGear> }>())
export const updateGearArms = createAction('[Gear] Update Gear Arms', props<{ arms: IProtectiveItem }>())
export const updateGearHands = createAction('[Gear] Update Gear Hands', props<{ hands: IProtectiveItem }>())
export const updateGearLeftFinger = createAction(
    '[Gear] Update Gear Left Finger',
    props<{ leftFinger: IProtectiveItem }>()
)
export const updateGearRightFinger = createAction(
    '[Gear] Update Gear Right Finger',
    props<{ rightFinger: IProtectiveItem }>()
)
export const updateGearFeet = createAction('[Gear] Update Gear Feet', props<{ feet: IProtectiveItem }>())
export const updateGearTorso = createAction('[Gear] Update Gear Torso', props<{ torso: IArmour }>())
export const updateGearHead = createAction('[Gear] Update Gear Head', props<{ head: IProtectiveItem }>())
