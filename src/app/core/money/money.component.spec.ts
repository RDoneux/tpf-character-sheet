import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MoneyComponent } from './money.component'
import { mockStore } from '../../utils/mocks'

describe('MoneyComponent', () => {
    let component: MoneyComponent
    let fixture: ComponentFixture<MoneyComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MoneyComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(MoneyComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
