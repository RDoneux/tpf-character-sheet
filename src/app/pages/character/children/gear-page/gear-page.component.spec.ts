import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GearPageComponent } from './gear-page.component'
import { mockStore } from '../../../../utils/mocks'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('GearPageComponent', () => {
    let component: GearPageComponent
    let fixture: ComponentFixture<GearPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GearPageComponent],
            providers: [mockStore, provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents()

        fixture = TestBed.createComponent(GearPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
