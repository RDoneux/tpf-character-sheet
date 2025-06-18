import { Injectable } from '@angular/core'
import { ISettings } from './interfaces/i-settings'
import { Store } from '@ngrx/store'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ExportService } from '../export/export.service'

@Injectable({
    providedIn: 'root',
})
export class AutoSaveService {
    private interval: any = null
    constructor(
        private store: Store<{ settings: ISettings }>,
        private exportService: ExportService
    ) {
        this.store
            .select('settings')
            .pipe(takeUntilDestroyed())
            .subscribe((settings: ISettings) => {
                if (settings.autoSave) {
                    this.interval = setInterval(
                        () => {
                            console.info('Auto-saving character...')
                            this.exportService.exportCharacterToJSON(false)
                        },
                        1000 * 60 * 5 // 5 minutes
                    )
                } else if (!settings.autoSave && this.interval) {
                    clearInterval(this.interval)
                    this.interval = null
                }
            })
    }
}
