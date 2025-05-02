import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SpellsComponent } from './spells.component'
import { mockStore } from '../../utils/mocks'

describe('SpellsComponent', () => {
    let component: SpellsComponent
    let fixture: ComponentFixture<SpellsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SpellsComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(SpellsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
