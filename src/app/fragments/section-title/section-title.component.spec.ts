import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SectionTitleComponent } from './section-title.component'

describe('SectionTitleComponent', () => {
    let component: SectionTitleComponent
    let fixture: ComponentFixture<SectionTitleComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SectionTitleComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SectionTitleComponent)
        component = fixture.componentInstance
        const componentRef = fixture.componentRef
        componentRef.setInput('title', 'Test Title')
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
