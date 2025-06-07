import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArmourClassComponent } from './armour-class.component'
import { mockStore } from '../../utils/mocks'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('ArmourClassComponent', () => {
    let component: ArmourClassComponent
    let fixture: ComponentFixture<ArmourClassComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ArmourClassComponent],
            providers: [mockStore, provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents()

        fixture = TestBed.createComponent(ArmourClassComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
