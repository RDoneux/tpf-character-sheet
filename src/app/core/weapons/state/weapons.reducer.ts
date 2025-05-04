import { createReducer, on } from '@ngrx/store'
import { initialWeaponState } from '../interfaces/i-weapons'
import { addWeapon, removeWeapon, updateAllWeapons, updateWeapon } from './weapons.actions'

export const weaponsReducer = createReducer(
    initialWeaponState,
    on(updateWeapon, (state, { weapon }) => ({
        ...state,
        [state.findIndex((w) => w.id === weapon.id)]: {
            ...state[state.findIndex((w) => w.id === weapon.id)],
            ...weapon,
        },
    })),
    on(updateAllWeapons, (_, { weapon }) => weapon),
    on(addWeapon, (state, { weapon }) => [...state, weapon]),
    on(removeWeapon, (state, { weaponId }) => state.filter((w) => w.id !== weaponId))
)
