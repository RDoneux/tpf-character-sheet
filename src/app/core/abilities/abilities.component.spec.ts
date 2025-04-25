import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AbilitiesComponent } from './abilities.component'
import { Store } from '@ngrx/store'
import { mockStore } from '../../utils/mocks'

describe('AbilitiesComponent', () => {
    let component: AbilitiesComponent
    let fixture: ComponentFixture<AbilitiesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AbilitiesComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(AbilitiesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
