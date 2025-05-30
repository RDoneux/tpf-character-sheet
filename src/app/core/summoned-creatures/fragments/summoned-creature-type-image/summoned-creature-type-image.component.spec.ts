import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SummonedCreatureTypeImageComponent } from './summoned-creature-type-image.component'

describe('SummonedCreatureTypeImageComponent', () => {
    let component: SummonedCreatureTypeImageComponent
    let fixture: ComponentFixture<SummonedCreatureTypeImageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SummonedCreatureTypeImageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SummonedCreatureTypeImageComponent)
        component = fixture.componentInstance
        const componentRef = fixture.componentRef
        componentRef.setInput('type', 'elemental')
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
