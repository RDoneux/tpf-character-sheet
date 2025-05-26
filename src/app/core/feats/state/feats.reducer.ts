import { createReducer, on } from '@ngrx/store'
import { initialFeatState } from '../interfaces/i-feat'
import { addFeat, removeFeat, updateAllFeats, updateFeat } from './feats.actions'

export const featsReducer = createReducer(
    initialFeatState,
    on(updateAllFeats, (_, { feats }) => {
        return feats
    }),
    on(addFeat, (state, { feat }) => {
        return [...state, feat]
    }),
    on(updateFeat, (state, { feat }) => {
        return state.map((f) => (f.id === feat.id ? { ...f, ...feat } : f))
    }),
    on(removeFeat, (state, { featId }) => {
        return state.filter((feat) => feat.id !== featId)
    })
)
