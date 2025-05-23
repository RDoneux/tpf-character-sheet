import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CastCounterModalComponent } from './cast-counter-modal.component'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { initialSpellState } from '../../interfaces/i-spells'
import { mockStore } from '../../../../utils/mocks'

describe('CastCounterModalComponent', () => {
    let component: CastCounterModalComponent
    let fixture: ComponentFixture<CastCounterModalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CastCounterModalComponent],
            providers: [
                mockStore,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        initialSpellState,
                        spellLevel: 'cantrips',
                    },
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(CastCounterModalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
