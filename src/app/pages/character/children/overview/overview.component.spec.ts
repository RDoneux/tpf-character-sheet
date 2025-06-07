import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OverviewComponent } from './overview.component'
import { mockStore } from '../../../../utils/mocks'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('OverviewComponent', () => {
    let component: OverviewComponent
    let fixture: ComponentFixture<OverviewComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OverviewComponent],
            providers: [mockStore, provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents()

        fixture = TestBed.createComponent(OverviewComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
