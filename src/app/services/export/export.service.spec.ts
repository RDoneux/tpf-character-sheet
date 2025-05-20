import { TestBed } from '@angular/core/testing'

import { ExportService } from './export.service'
import { mockStore } from '../../utils/mocks'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('ExportService', () => {
    let service: ExportService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [mockStore, provideHttpClient(), provideHttpClientTesting()],
        })
        service = TestBed.inject(ExportService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
