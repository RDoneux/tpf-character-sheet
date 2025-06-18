import { DestroyRef, effect, Injectable, signal, WritableSignal } from '@angular/core'
import { initialSettingsState, ISettings, IUser } from './interfaces/i-settings'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { updateSomeSettings } from './state/settings.actions'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    public settings: WritableSignal<ISettings> = signal(initialSettingsState)

    get autoCalculateFields(): boolean {
        return this.settings().autoCalculateFields
    }

    get autoCalculateFields$(): Observable<boolean> {
        return this.getSettings$<{ autoCalculateFields: boolean }>(['autoCalculateFields']).pipe(
            takeUntilDestroyed(this.destroyRef),
            map((settings: Partial<ISettings>) => settings.autoCalculateFields as boolean)
        )
    }

    constructor(
        private store: Store<{ settings: ISettings }>,
        private destroyRef: DestroyRef,
        private httpClient: HttpClient
    ) {
        this.store
            .select('settings')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((settings: ISettings) => this.settings.set(settings))
    }

    updateSettings(settings: Partial<ISettings>) {
        this.store.dispatch(updateSomeSettings({ settings }))
    }

    getSettings$<T>(key: (keyof ISettings)[]): Observable<T> {
        return this.store.select('settings').pipe(
            takeUntilDestroyed(this.destroyRef),
            map((settings: ISettings) => {
                const targetSettings = {}
                key.forEach((k) => {
                    ;(targetSettings as any)[k] = settings[k]
                })
                return targetSettings as T
            })
        )
    }

    getCharacterSheetList$(): Observable<string[]> {
        return this.httpClient
            .get<string[]>(environment.characterSheetListUrl)
            .pipe(takeUntilDestroyed(this.destroyRef))
    }

    createUser(user: IUser): Observable<IUser> {
        return this.httpClient.post<{ message: string; user: IUser }>(environment.userUrl, user).pipe(
            takeUntilDestroyed(this.destroyRef),
            map((response) => response.user)
        )
    }

    login(user: IUser): Observable<IUser> {
        return this.httpClient
            .get<IUser>(`${environment.userUrl}?email=${user.email}`)
            .pipe(takeUntilDestroyed(this.destroyRef))
    }
}
