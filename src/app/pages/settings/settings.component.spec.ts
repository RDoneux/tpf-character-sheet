import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SettingsComponent } from './settings.component'
import { mockStore } from '../../utils/mocks'
import { settingsServiceMock } from '../../mocks/settings-service.mocks'

describe('SettingsComponent', () => {
    let component: SettingsComponent
    let fixture: ComponentFixture<SettingsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SettingsComponent],
            providers: [mockStore, settingsServiceMock],
        }).compileComponents()

        fixture = TestBed.createComponent(SettingsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
