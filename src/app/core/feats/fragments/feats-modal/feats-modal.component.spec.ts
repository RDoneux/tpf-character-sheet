import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FeatsModalComponent } from './feats-modal.component'
import { mockStore } from '../../../../utils/mocks'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

describe('FeatsModalComponent', () => {
    let component: FeatsModalComponent
    let fixture: ComponentFixture<FeatsModalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FeatsModalComponent],
            providers: [
                mockStore,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        feat: { id: 1, name: 'test', description: 'test-description' },
                        isNew: false,
                    },
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(FeatsModalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
