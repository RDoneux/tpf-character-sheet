import { createReducer, on } from '@ngrx/store'
import { initialMoneyState } from '../interfaces/i-money'
import { updateCopper, updateGold, updateMoney, updatePlatinum, updateSilver } from './money.actions'

export const moneyReducer = createReducer(
    initialMoneyState,
    on(updateMoney, (state, { money }) => ({
        ...state,
        ...money,
    })),
    on(updateCopper, (state, { copper }) => ({
        ...state,
        cp: copper,
    })),
    on(updateSilver, (state, { silver }) => ({
        ...state,
        sp: silver,
    })),
    on(updateGold, (state, { gold }) => ({
        ...state,
        gp: gold,
    })),
    on(updatePlatinum, (state, { platinum }) => ({
        ...state,
        pp: platinum,
    }))
)
