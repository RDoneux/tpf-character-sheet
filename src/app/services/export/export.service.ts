import { inject, Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { firstValueFrom } from 'rxjs'
import { importAppState, selectAppState } from '../../app.config'
import { IBackground } from '../../core/background/interfaces/i-background'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
    providedIn: 'root',
})
export class ExportService {
    public static readonly DOWNLOAD_NAME = 'unknown_character'
    private snackBar = inject(MatSnackBar)

    constructor(
        private store: Store<{ background: IBackground }>,
        private http: HttpClient
    ) {}

    public async exportCharacterToJSON(): Promise<void> {
        const state = await firstValueFrom(this.store.select(selectAppState))

        const characterName: string =
            (await firstValueFrom(this.store.select((state: { background: IBackground }) => state.background)))
                .character ?? ExportService.DOWNLOAD_NAME

        const json = JSON.stringify(state, null, 2)

        this.http
            .post(environment.saveCharacterUrl, {
                bucket: 'character-sheet-lambda-backup-9975be8',
                key: `character-sheets/${characterName}.json`,
                body: json,
            })
            .subscribe({
                next: () => {
                    this.snackBar.open('Character saved successfully:', 'Close', {
                        panelClass: 'snackbar-success',
                        duration: 5000,
                    })
                },
                error: (error) => {
                    this.snackBar.open(`Error saving character: ${error.message}`, 'Close', {
                        panelClass: 'snackbar-error',
                    })
                },
            })
    }

    public async importCharacterFromJSON(): Promise<void> {
        const characterName: string =
            (await firstValueFrom(this.store.select((state: { background: IBackground }) => state.background)))
                .character ?? ExportService.DOWNLOAD_NAME

        this.http
            .get(
                `${environment.saveCharacterUrl}?bucket=character-sheet-lambda-backup-9975be8&key=character-sheets/${characterName}.json`
            )
            .subscribe({
                next: (value: any) => {
                    const json = JSON.stringify(value, null, 2)
                    const state = JSON.parse(json as string)
                    this.store.dispatch(importAppState({ state }))
                    this.snackBar.open('Character imported successfully:', 'Close', {
                        panelClass: 'snackbar-success',
                        duration: 5000,
                    })
                },
                error: (error) => {
                    this.snackBar.open(`Error importing character: ${error.message}`, 'Close', {
                        panelClass: 'snackbar-error',
                    })
                },
            })
    }
}
