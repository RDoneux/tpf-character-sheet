import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArmourClassComponent } from './armour-class.component'
import { mockStore } from '../../utils/mocks'

describe('ArmourClassComponent', () => {
    let component: ArmourClassComponent
    let fixture: ComponentFixture<ArmourClassComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ArmourClassComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(ArmourClassComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
