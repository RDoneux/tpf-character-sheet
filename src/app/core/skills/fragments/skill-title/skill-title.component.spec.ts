import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SkillTitleComponent } from './skill-title.component'
import { initialSkillState } from '../../interfaces/i-skills'
import { Ability } from '../../../abilities/interfaces/i-abilities'

describe('SkillTitleComponent', () => {
    let component: SkillTitleComponent
    let fixture: ComponentFixture<SkillTitleComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SkillTitleComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SkillTitleComponent)
        component = fixture.componentInstance
        const componentRef = fixture.componentRef
        componentRef.setInput('skill', { ...initialSkillState, keyAbility: Ability.DEXTERITY })

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
