import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GearComponent } from './gear.component'
import { mockStore } from '../../utils/mocks'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('GearComponent', () => {
    let component: GearComponent
    let fixture: ComponentFixture<GearComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GearComponent],
            providers: [mockStore, provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents()

        fixture = TestBed.createComponent(GearComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
