import { Injectable } from '@angular/core'
import { STORAGE_KEY } from '../utils/state'

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService {
    constructor() {}

    setItem<T>(key: string, value: T): void {
        sessionStorage.setItem(`${STORAGE_KEY}${key}`, JSON.stringify(value))
    }

    getItem<T>(key: string): T | null {
        const item = sessionStorage.getItem(`${STORAGE_KEY}${key}`)
        return item ? JSON.parse(item) : null
    }
}
