import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SchoolImageComponent } from './school-image.component'

describe('DiviniationComponent', () => {
    let component: SchoolImageComponent
    let fixture: ComponentFixture<SchoolImageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SchoolImageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SchoolImageComponent)
        component = fixture.componentInstance
        const componentRef = fixture.componentRef
        componentRef.setInput('prepared', true)
        componentRef.setInput('school', 'Divination')
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
