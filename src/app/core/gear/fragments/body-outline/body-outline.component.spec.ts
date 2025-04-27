import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BodyOutlineComponent } from './body-outline.component'

describe('BodyOutlineComponent', () => {
    let component: BodyOutlineComponent
    let fixture: ComponentFixture<BodyOutlineComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BodyOutlineComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(BodyOutlineComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
