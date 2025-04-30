import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SkillsModalComponent } from './skills-modal.component'
import { mockStore } from '../../../../utils/mocks'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

describe('SkillsModalComponent', () => {
    let component: SkillsModalComponent
    let fixture: ComponentFixture<SkillsModalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SkillsModalComponent],
            providers: [
                mockStore,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        skill: {
                            keyAbility: 'test',
                            skillModifier: 0,
                            ranks: 0,
                            miscModifier: 0,
                            isClassSkill: false,
                            abilityModifier: 0,
                        },
                    },
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(SkillsModalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
