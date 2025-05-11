import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LeaveCampComponent } from './leave-camp.component'
import { mockStore } from '../../../../../../utils/mocks'

describe('LeaveCampComponent', () => {
    let component: LeaveCampComponent
    let fixture: ComponentFixture<LeaveCampComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LeaveCampComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(LeaveCampComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
