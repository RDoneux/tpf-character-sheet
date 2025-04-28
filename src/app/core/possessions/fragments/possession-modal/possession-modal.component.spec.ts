import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PossessionModalComponent } from './possession-modal.component'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { mockStore } from '../../../../utils/mocks'
import { emptyPossession } from '../../interfaces/i-possessions'

describe('PossessionModalComponent', () => {
    let component: PossessionModalComponent
    let fixture: ComponentFixture<PossessionModalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PossessionModalComponent],
            providers: [
                mockStore,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        possession: { id: 1, name: 'test', description: 'test-description', quantity: 1, weight: 0 },
                        isNew: false,
                    },
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(PossessionModalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
