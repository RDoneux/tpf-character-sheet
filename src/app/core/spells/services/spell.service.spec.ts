import { TestBed } from '@angular/core/testing'

import { SpellService } from './spell.service'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('SpellService', () => {
    let service: SpellService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        })
        service = TestBed.inject(SpellService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
