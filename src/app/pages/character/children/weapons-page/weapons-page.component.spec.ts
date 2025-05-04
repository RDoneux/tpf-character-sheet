import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WeaponsPageComponent } from './weapons-page.component'
import { mockStore } from '../../../../utils/mocks'

describe('WeaponsPageComponent', () => {
    let component: WeaponsPageComponent
    let fixture: ComponentFixture<WeaponsPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WeaponsPageComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(WeaponsPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
