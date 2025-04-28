import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ConfirmModalComponent } from './confirm-modal.component'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { mockStore } from '../../utils/mocks'

describe('ConfirmModalComponent', () => {
    let component: ConfirmModalComponent
    let fixture: ComponentFixture<ConfirmModalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConfirmModalComponent],
            providers: [
                mockStore,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        possession: { id: 1, name: 'test', description: 'test-description', quantity: 1, weight: 0 },
                        isNew: false,
                    },
                },
                {
                    provide: MatDialogRef,
                    useValue: {
                        close: jest.fn(), // Mock the close method
                    },
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(ConfirmModalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
