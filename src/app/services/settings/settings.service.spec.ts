import { TestBed } from '@angular/core/testing'

import { SettingsService } from './settings.service'
import { mockStore } from '../../utils/mocks'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('SettingsService', () => {
    let service: SettingsService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [mockStore, provideHttpClient(), provideHttpClientTesting()],
        })
        service = TestBed.inject(SettingsService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
