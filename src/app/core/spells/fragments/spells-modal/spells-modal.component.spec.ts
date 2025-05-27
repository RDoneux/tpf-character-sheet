import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SpellsModalComponent } from './spells-modal.component'
import { mockStore } from '../../../../utils/mocks'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { initialSpellState } from '../../interfaces/i-spells'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('SpellsModalComponent', () => {
    let component: SpellsModalComponent
    let fixture: ComponentFixture<SpellsModalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SpellsModalComponent],
            providers: [
                mockStore,
                provideHttpClient(),
                provideHttpClientTesting(),
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        spell: initialSpellState,
                        spellLevel: 'cantrips',
                    },
                },
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(SpellsModalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
