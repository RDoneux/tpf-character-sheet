import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { firstValueFrom } from 'rxjs'
import { importAppState, selectAppState } from '../../app.config'
import { IBackground } from '../../core/background/interfaces/i-background'

@Injectable({
    providedIn: 'root',
})
export class ExportService {
    public static readonly DOWNLOAD_NAME = 'unknown_character'

    constructor(private store: Store<{ background: IBackground }>) {}

    public async exportCharacterToJSON(): Promise<void> {
        const state = await firstValueFrom(this.store.select(selectAppState))

        const characterName: string =
            (await firstValueFrom(this.store.select((state: { background: IBackground }) => state.background)))
                .character ?? ExportService.DOWNLOAD_NAME

        const json = JSON.stringify(state, null, 2)
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = characterName + '.json'
        a.click()
        URL.revokeObjectURL(url)
    }

    public async importCharacterFromJSON(file: File): Promise<void> {
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = async (event) => {
            const json = event.target?.result
            if (json) {
                const state = JSON.parse(json as string)
                this.store.dispatch(importAppState({ state }))
            }
        }
    }
}
