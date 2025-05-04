import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SkillsPageComponent } from './skills-page.component'
import { mockStore } from '../../../../utils/mocks'
import { settingsServiceMock } from '../../../../mocks/settings-service.mocks'

describe('SkillsPageComponent', () => {
    let component: SkillsPageComponent
    let fixture: ComponentFixture<SkillsPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SkillsPageComponent],
            providers: [mockStore, settingsServiceMock],
        }).compileComponents()

        fixture = TestBed.createComponent(SkillsPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
