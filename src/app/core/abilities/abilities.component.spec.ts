import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AbilitiesComponent } from './abilities.component'
import { Store } from '@ngrx/store'
import { mockStore } from '../../utils/mocks'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('AbilitiesComponent', () => {
    let component: AbilitiesComponent
    let fixture: ComponentFixture<AbilitiesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AbilitiesComponent],
            providers: [mockStore, provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents()

        fixture = TestBed.createComponent(AbilitiesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
