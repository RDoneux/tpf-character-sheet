import { ComponentFixture, TestBed } from '@angular/core/testing'

import { JoinCampComponent } from './join-camp.component'
import { mockStore } from '../../../../../../utils/mocks'

describe('JoinCampComponent', () => {
    let component: JoinCampComponent
    let fixture: ComponentFixture<JoinCampComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [JoinCampComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(JoinCampComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
