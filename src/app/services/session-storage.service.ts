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

    getItem<T>(key: string): T {
        return JSON.parse(sessionStorage.getItem(`${STORAGE_KEY}${key}`) ?? '{}')
    }
}
