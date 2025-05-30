import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SummonedCreatureCardComponent } from './summoned-creature-card.component'
import { initialSummonedCreeatureState, ISummonedCreature } from '../../interfaces/i-summoned-creatures'

describe('SummonedCreatureCardComponent', () => {
    let component: SummonedCreatureCardComponent
    let fixture: ComponentFixture<SummonedCreatureCardComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SummonedCreatureCardComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SummonedCreatureCardComponent)
        component = fixture.componentInstance
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
