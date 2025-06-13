import { ComponentFixture, TestBed } from '@angular/core/testing'

import { JoinCampComponent } from './join-camp.component'
import { mockStore } from '../../../../../../utils/mocks'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('JoinCampComponent', () => {
    let component: JoinCampComponent
    let fixture: ComponentFixture<JoinCampComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [JoinCampComponent],
            providers: [mockStore, provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents()

        fixture = TestBed.createComponent(JoinCampComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
