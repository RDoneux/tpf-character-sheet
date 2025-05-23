import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CampPageComponent } from './camp-page.component'
import { mockStore } from '../../../../utils/mocks'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('CampPageComponent', () => {
    let component: CampPageComponent
    let fixture: ComponentFixture<CampPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CampPageComponent],
            providers: [provideHttpClient(), provideHttpClientTesting(), mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(CampPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
