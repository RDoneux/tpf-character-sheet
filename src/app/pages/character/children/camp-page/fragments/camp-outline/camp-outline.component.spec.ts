import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CampOutlineComponent } from './camp-outline.component'

describe('CampOutlineComponent', () => {
    let component: CampOutlineComponent
    let fixture: ComponentFixture<CampOutlineComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CampOutlineComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(CampOutlineComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
