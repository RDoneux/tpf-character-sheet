import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GearItemComponent } from './gear-item.component'

describe('GearItemComponent', () => {
    let component: GearItemComponent
    let fixture: ComponentFixture<GearItemComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GearItemComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(GearItemComponent)
        component = fixture.componentInstance
        const componentRef = fixture.componentRef
        componentRef.setInput('item', {})
        componentRef.setInput('itemForm', {})

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
