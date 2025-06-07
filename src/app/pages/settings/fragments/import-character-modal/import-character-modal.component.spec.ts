import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ImportCharacterModalComponent } from './import-character-modal.component'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { mockStore } from '../../../../utils/mocks'
import { MatDialogRef } from '@angular/material/dialog'

describe('ImportCharacterModalComponent', () => {
    let component: ImportCharacterModalComponent
    let fixture: ComponentFixture<ImportCharacterModalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ImportCharacterModalComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                mockStore,
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(ImportCharacterModalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
