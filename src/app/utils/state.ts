import { ActionReducer } from '@ngrx/store'
import { camelCase } from 'lodash-es'

const STORAGE_KEY = 'TPF-STATE:'

export function storageMetaReducer<T>(
    reducer: ActionReducer<T>
): ActionReducer<T> {
    return (state, action) => {
        const nextState = reducer(state, action)

        const match = action.type.match(/^\[([^\]]+)\]/)
        const sliceName = match ? camelCase(match[1]) : null

        if (sliceName && nextState) {
            const sliceState = (nextState as any)[sliceName]
            if (sliceState !== undefined) {
                localStorage.setItem(
                    `${STORAGE_KEY}${sliceName}`,
                    JSON.stringify(sliceState)
                )
            }
        }

        return nextState
    }
}

export function rehydrateState<T>(): T | undefined {
    const initialState: Partial<T> = {}

    // Iterate over localStorage keys to rehydrate slices dynamically
    for (const key in localStorage) {
        if (key.startsWith(STORAGE_KEY)) {
            const sliceName = key.replace(`${STORAGE_KEY}`, '')
            const sliceState = localStorage.getItem(key)
            if (sliceState) {
                ;(initialState as any)[sliceName] = JSON.parse(sliceState)
            }
        }
    }

    return initialState as T
}
