import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CombatMiscComponent } from './combat-misc.component'
import { mockStore } from '../../utils/mocks'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('CombatMiscComponent', () => {
    let component: CombatMiscComponent
    let fixture: ComponentFixture<CombatMiscComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CombatMiscComponent],
            providers: [mockStore, provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents()

        fixture = TestBed.createComponent(CombatMiscComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
