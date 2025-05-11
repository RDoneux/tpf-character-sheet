import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CampMoneyComponent } from './camp-money.component'
import { mockStore } from '../../../../../../utils/mocks'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('CampMoneyComponent', () => {
    let component: CampMoneyComponent
    let fixture: ComponentFixture<CampMoneyComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CampMoneyComponent],
            providers: [mockStore, provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents()

        fixture = TestBed.createComponent(CampMoneyComponent)
        component = fixture.componentInstance
        const componentRef = fixture.componentRef
        componentRef.setInput('campCopper', 0)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
