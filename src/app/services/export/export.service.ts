import { DestroyRef, inject, Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { firstValueFrom, forkJoin } from 'rxjs'
import { importAppState, selectAppState } from '../../app.config'
import { IBackground } from '../../core/background/interfaces/i-background'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { MatSnackBar } from '@angular/material/snack-bar'
import { LoadingService } from '../loading/loading.service'
import { ICharacterSummary } from '../settings/interfaces/i-settings'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

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
        private destroyRef: DestroyRef
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
        const userPayload = {
            email: user?.email,
            user: { ...user, characters: [...(user?.characters ?? []), characterOverview] },
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
            next: () => {
                if (notify) {
                    this.snackBar.open('Character saved successfully:', 'Close', {
                        panelClass: 'snackbar-success',
                        duration: 5000,
                    })
                }
            },
            error: (error) => {
                this.snackBar.open(`Error saving character: ${error.message}`, 'Close', {
                    panelClass: 'snackbar-error',
                })
                this.loadingService.setLoading(false)
            },
        })
    }

    public async importCharacterFromJSON(characterName: string): Promise<void> {
        this.loadingService.setLoading(true)

        this.http.get(`${environment.saveCharacterUrl}?key=character-sheets/${characterName}.json`).subscribe({
            next: (value: any) => {
                const json = JSON.stringify(value, null, 2)
                const state = JSON.parse(json as string)
                this.store.dispatch(importAppState({ state }))
                this.snackBar.open('Character imported successfully:', 'Close', {
                    panelClass: 'snackbar-success',
                    duration: 5000,
                })
                this.loadingService.setLoading(false)
            },
            error: (error) => {
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
            classes: classes.map((c: any) => c.name),
            level: level,
        }
    }
}
