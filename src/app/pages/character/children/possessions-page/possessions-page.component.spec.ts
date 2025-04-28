import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PossessionsPageComponent } from './possessions-page.component'
import { mockStore } from '../../../../utils/mocks'

describe('PossessionsPageComponent', () => {
    let component: PossessionsPageComponent
    let fixture: ComponentFixture<PossessionsPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PossessionsPageComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(PossessionsPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
