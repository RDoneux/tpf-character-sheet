import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InitiativeComponent } from './initiative.component'
import { mockStore } from '../../utils/mocks'

describe('InitiativeComponent', () => {
    let component: InitiativeComponent
    let fixture: ComponentFixture<InitiativeComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InitiativeComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(InitiativeComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
