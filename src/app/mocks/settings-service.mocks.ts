import { SettingsService } from '../services/settings/settings.service'

export const settingsServiceMock = {
    provide: SettingsService,
    useValue: {
        settings: () => ({
            autoCalculateFields: true,
        }),
    },
}
