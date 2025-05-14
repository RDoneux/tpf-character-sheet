import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CombatMiscComponent } from './combat-misc.component'

describe('CombatMiscComponent', () => {
    let component: CombatMiscComponent
    let fixture: ComponentFixture<CombatMiscComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CombatMiscComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(CombatMiscComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
