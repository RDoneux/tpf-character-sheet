import { DestroyRef, Injectable, signal, WritableSignal } from '@angular/core'
import { initialSettingsState, ISettings } from './interfaces/i-settings'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { updateSomeSettings } from './state/settings.actions'

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    public settings: WritableSignal<ISettings> = signal(initialSettingsState)

    constructor(
        private store: Store<{ settings: ISettings }>,
        private destroyRef: DestroyRef
    ) {
        this.store
            .select('settings')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((settings: ISettings) => this.settings.set(settings))
    }

    updateSettings(settings: Partial<ISettings>) {
        this.store.dispatch(updateSomeSettings({ settings }))
    }

    getSettings$(key: (keyof ISettings)[]): Observable<Partial<ISettings>> {
        return this.store.select('settings').pipe(
            takeUntilDestroyed(this.destroyRef),
            map((settings: ISettings) => {
                const targetSettings: Partial<ISettings> = {}
                Object.keys(settings).forEach((setting: string) => {
                    const typedKey = setting as keyof ISettings
                    if (key.includes(typedKey)) {
                        targetSettings[typedKey] = settings[typedKey]
                    }
                })
                return targetSettings
            })
        )
    }
}
