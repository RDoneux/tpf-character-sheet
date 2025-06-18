import { TestBed } from '@angular/core/testing'

import { AutoSaveService } from './auto-save.service'
import { mockStore } from '../../utils/mocks'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('AutoSaveService', () => {
    let service: AutoSaveService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [mockStore, provideHttpClient(), provideHttpClientTesting()],
        })
        service = TestBed.inject(AutoSaveService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
