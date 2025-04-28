import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PossessionsComponent } from './possessions.component'
import { mockStore } from '../../utils/mocks'

describe('PossessionsComponent', () => {
    let component: PossessionsComponent
    let fixture: ComponentFixture<PossessionsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PossessionsComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(PossessionsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
