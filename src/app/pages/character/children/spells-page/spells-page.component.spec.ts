import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SpellsPageComponent } from './spells-page.component'
import { mockStore } from '../../../../utils/mocks'

describe('SpellsPageComponent', () => {
    let component: SpellsPageComponent
    let fixture: ComponentFixture<SpellsPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SpellsPageComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(SpellsPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
