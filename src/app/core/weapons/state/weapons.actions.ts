import { createAction, props } from '@ngrx/store'
import { IWeapon } from '../interfaces/i-weapons'

export const updateWeapon = createAction('[Weapons] Update Weapon', props<{ weapon: IWeapon }>())
export const updateAllWeapons = createAction('[Weapons] Update All Weapons', props<{ weapon: IWeapon[] }>())
export const addWeapon = createAction('[Weapons] Add Weapon', props<{ weapon: IWeapon }>())
export const removeWeapon = createAction('[Weapons] Remove Weapon', props<{ weaponId: string }>())
