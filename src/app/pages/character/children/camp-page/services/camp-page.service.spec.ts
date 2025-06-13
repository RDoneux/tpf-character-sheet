import { TestBed } from '@angular/core/testing'

import { CampPageService } from './camp-page.service'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('CampPageService', () => {
    let service: CampPageService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        })
        service = TestBed.inject(CampPageService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
