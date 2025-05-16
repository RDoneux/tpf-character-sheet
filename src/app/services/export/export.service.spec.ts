import { TestBed } from '@angular/core/testing'

import { ExportService } from './export.service'
import { mockStore } from '../../utils/mocks'

describe('ExportService', () => {
    let service: ExportService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [mockStore],
        })
        service = TestBed.inject(ExportService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
