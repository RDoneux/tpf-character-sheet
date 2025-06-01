import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SummonedCreatureModalComponent } from './summoned-creature-modal.component'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { mockStore } from '../../../../utils/mocks'

describe('SummonedCreatureModalComponent', () => {
    let component: SummonedCreatureModalComponent
    let fixture: ComponentFixture<SummonedCreatureModalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SummonedCreatureModalComponent],
            providers: [
                mockStore,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        name: '',
                        currentHitPoints: '0',
                        maxHitPoints: '0',
                        abilities: {
                            strength: 0,
                            dexterity: 0,
                            constitution: 0,
                            intelligence: 0,
                            wisdom: 0,
                            charisma: 0,
                        },
                        size: '',
                        saves: {
                            fortitude: 0,
                            reflex: 0,
                            will: 0,
                        },
                    },
                },
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(SummonedCreatureModalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
