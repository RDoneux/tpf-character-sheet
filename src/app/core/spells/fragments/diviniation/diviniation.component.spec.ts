import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DiviniationComponent } from './diviniation.component'

describe('DiviniationComponent', () => {
    let component: DiviniationComponent
    let fixture: ComponentFixture<DiviniationComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DiviniationComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(DiviniationComponent)
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
