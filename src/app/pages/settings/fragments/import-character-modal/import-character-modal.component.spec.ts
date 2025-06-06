import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ImportCharacterModalComponent } from './import-character-modal.component'

describe('ImportCharacterModalComponent', () => {
    let component: ImportCharacterModalComponent
    let fixture: ComponentFixture<ImportCharacterModalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ImportCharacterModalComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ImportCharacterModalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
