import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SkillsComponent } from './skills.component'
import { mockStore } from '../../utils/mocks'
import { settingsServiceMock } from '../../mocks/settings-service.mocks'

describe('SkillsComponent', () => {
    let component: SkillsComponent
    let fixture: ComponentFixture<SkillsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SkillsComponent],
            providers: [mockStore, settingsServiceMock],
        }).compileComponents()

        fixture = TestBed.createComponent(SkillsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
