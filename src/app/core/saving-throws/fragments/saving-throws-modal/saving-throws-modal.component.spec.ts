import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SavingThrowsModalComponent } from './saving-throws-modal.component'
import { FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { initialSavingThrowsState, ISavingThrows, ISavingThrowsDefForm } from '../../interfaces/i-saving-throws'
import { buildForm } from '../../../../utils/form'

describe('SavingThrowsModalComponent', () => {
    let component: SavingThrowsModalComponent
    let fixture: ComponentFixture<SavingThrowsModalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SavingThrowsModalComponent],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        form: null,
                        key: 'fortitude',
                    },
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(SavingThrowsModalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
