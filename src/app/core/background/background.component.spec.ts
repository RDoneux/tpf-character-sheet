import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BackgroundComponent } from './background.component'
import { mockStore } from '../../utils/mocks'
import { settingsServiceMock } from '../../mocks/settings-service.mocks'

describe('BackgroundComponent', () => {
    let component: BackgroundComponent
    let fixture: ComponentFixture<BackgroundComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BackgroundComponent],
            providers: [mockStore, settingsServiceMock],
        }).compileComponents()

        fixture = TestBed.createComponent(BackgroundComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
