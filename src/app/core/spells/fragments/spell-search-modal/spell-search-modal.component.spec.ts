import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SpellSearchModalComponent } from './spell-search-modal.component'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { MatDialogRef } from '@angular/material/dialog'

describe('SpellSearchModalComponent', () => {
    let component: SpellSearchModalComponent
    let fixture: ComponentFixture<SpellSearchModalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SpellSearchModalComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(SpellSearchModalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
