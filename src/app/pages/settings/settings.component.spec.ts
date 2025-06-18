import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SettingsComponent } from './settings.component'
import { mockStore } from '../../utils/mocks'
import { settingsServiceMock } from '../../mocks/settings-service.mocks'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('SettingsComponent', () => {
    let component: SettingsComponent
    let fixture: ComponentFixture<SettingsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SettingsComponent],
            providers: [mockStore, settingsServiceMock, provideHttpClient(), provideHttpClientTesting],
        }).compileComponents()

        fixture = TestBed.createComponent(SettingsComponent)
        component = fixture.componentInstance
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
