import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SummonedCreaturesComponent } from './summoned-creatures.component'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { mockStore } from '../../utils/mocks'

describe('SummonedCreaturesComponent', () => {
    let component: SummonedCreaturesComponent
    let fixture: ComponentFixture<SummonedCreaturesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SummonedCreaturesComponent],
            providers: [provideHttpClient(), provideHttpClientTesting(), mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(SummonedCreaturesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
