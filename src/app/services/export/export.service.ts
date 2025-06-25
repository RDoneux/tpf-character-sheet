import { DestroyRef, inject, Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { firstValueFrom, forkJoin, map } from 'rxjs'
import { importAppState, selectAppState } from '../../app.config'
import { IBackground } from '../../core/background/interfaces/i-background'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { MatSnackBar } from '@angular/material/snack-bar'
import { LoadingService } from '../loading/loading.service'
import { ICharacterSummary, IUser } from '../settings/interfaces/i-settings'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { updateSomeSettings } from '../settings/state/settings.actions'
import { SettingsService } from '../settings/settings.service'

@Injectable({
    providedIn: 'root',
})
export class ExportService {
    public static readonly DOWNLOAD_NAME = 'unknown_character'
    private snackBar = inject(MatSnackBar)

    constructor(
        private store: Store<{ background: IBackground }>,
        private http: HttpClient,
        private loadingService: LoadingService,
        private destroyRef: DestroyRef,
        private settingsService: SettingsService
    ) {}

    public async exportCharacterToJSON(notify: boolean = true): Promise<void> {
        this.loadingService.setLoading(true)

        const state = await firstValueFrom(this.store.select(selectAppState))
        const id = await firstValueFrom(this.store.select((state: { background: IBackground }) => state.background.id))

        // Remove user from settings
        const { user, ...settings } = state.settings
        const stateCopy = { ...state, settings }
        const json = JSON.stringify(stateCopy, null, 2)

        // Create character overview
        const characterOverview: ICharacterSummary = this.createCharacterOverview(stateCopy)
        // remove the id from characterOverview to avoid duplication
        const existingCharacters = user.characters.filter((c: ICharacterSummary) => c.id !== characterOverview.id)
        const userPayload = {
            email: user?.email,
            user: { ...user, characters: [...(existingCharacters ?? []), characterOverview] },
        }

        const characterPayload = {
            key: `character-sheets/${id}.json`,
            body: json,
        }

        const updateUser$ = this.http.put(environment.userUrl, userPayload).pipe(takeUntilDestroyed(this.destroyRef))
        const saveCharacter$ = this.http
            .post(environment.saveCharacterUrl, characterPayload)
            .pipe(takeUntilDestroyed(this.destroyRef))

        forkJoin([updateUser$, saveCharacter$]).subscribe({
            next: ([updateUserResponse]) => {
                if (notify) {
                    this.snackBar.open('Character saved successfully:', 'Close', {
                        panelClass: 'snackbar-success',
                        duration: 5000,
                    })
                }
                this.store.dispatch(updateSomeSettings({ settings: { user: updateUserResponse as IUser } }))
                this.loadingService.setLoading(false)
            },
            error: (error) => {
                this.snackBar.open(`Error saving character: ${error.message}`, 'Close', {
                    panelClass: 'snackbar-error',
                })
                this.loadingService.setLoading(false)
            },
        })
    }

    public async importCharacterFromJSON(characterId: string): Promise<void> {
        this.loadingService.setLoading(true)

        this.http.get(`${environment.saveCharacterUrl}?key=character-sheets/${characterId}.json`).subscribe({
            next: (value: any) => {
                const json = JSON.stringify(value, null, 2)
                const state = JSON.parse(json as string)
                state.settings.user = this.settingsService.settings().user

                this.store.dispatch(importAppState({ state }))
                this.snackBar.open('Character imported successfully:', 'Close', {
                    panelClass: 'snackbar-success',
                    duration: 5000,
                })
                this.loadingService.setLoading(false)
            },
            error: (error) => {
                console.error('Error importing character:', error)
                this.snackBar.open(`Error importing character: ${error.message}`, 'Close', {
                    panelClass: 'snackbar-error',
                })
                this.loadingService.setLoading(false)
            },
        })
    }

    private createCharacterOverview(state: any): ICharacterSummary {
        const { character, id, classes } = state.background
        const { level } = state.experience

        return {
            name: character,
            id: id,
            classes: classes.map((c: any) => c.class),
            level: level,
        }
    }
}
