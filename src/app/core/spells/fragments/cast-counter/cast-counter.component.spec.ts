import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CastCounterComponent } from './cast-counter.component'
import { mockStore } from '../../../../utils/mocks'

describe('CastCounterComponent', () => {
    let component: CastCounterComponent
    let fixture: ComponentFixture<CastCounterComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CastCounterComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(CastCounterComponent)
        component = fixture.componentInstance
        const componentRef = fixture.componentRef
        componentRef.setInput('casts', [false])
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
