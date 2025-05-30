import { TestBed } from '@angular/core/testing'

import { SummonedCreaturesService } from './summoned-creatures.service'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('SummonedCreaturesService', () => {
    let service: SummonedCreaturesService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting],
        })
        service = TestBed.inject(SummonedCreaturesService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
