import { of } from 'rxjs'
import { SettingsService } from '../services/settings/settings.service'

export const settingsServiceMock = {
    provide: SettingsService,
    useValue: {
        settings: () => ({
            autoCalculateFields: true,
        }),

        getSettings$: () =>
            of({
                autoCalculateFields: true,
                autoSave: true,
                user: null,
            }),
    },
}
