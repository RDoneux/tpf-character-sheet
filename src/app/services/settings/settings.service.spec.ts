import { TestBed } from '@angular/core/testing'

import { SettingsService } from './settings.service'
import { mockStore } from '../../utils/mocks'

describe('SettingsService', () => {
    let service: SettingsService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [mockStore],
        })
        service = TestBed.inject(SettingsService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
