import { inject, Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { firstValueFrom } from 'rxjs'
import { importAppState, selectAppState } from '../../app.config'
import { IBackground } from '../../core/background/interfaces/i-background'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { MatSnackBar } from '@angular/material/snack-bar'
import { LoadingService } from '../loading/loading.service'

@Injectable({
    providedIn: 'root',
})
export class ExportService {
    public static readonly DOWNLOAD_NAME = 'unknown_character'
    private snackBar = inject(MatSnackBar)

    constructor(
        private store: Store<{ background: IBackground }>,
        private http: HttpClient,
        private loadingService: LoadingService
    ) {}

    public async exportCharacterToJSON(): Promise<void> {
        this.loadingService.setLoading(true)

        const state = await firstValueFrom(this.store.select(selectAppState))

        const id = await firstValueFrom(
            this.store.select(
                (state: { background: IBackground }) =>
                    `${state.background.character ?? ExportService.DOWNLOAD_NAME}|:|${state.background.id}`
            )
        )

        const json = JSON.stringify(state, null, 2)

        this.http
            .post(environment.saveCharacterUrl, {
                key: `character-sheets/${id}.json`,
                body: json,
            })
            .subscribe({
                next: () => {
                    this.snackBar.open('Character saved successfully:', 'Close', {
                        panelClass: 'snackbar-success',
                        duration: 5000,
                    })
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
}
