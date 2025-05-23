import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FeatsComponent } from './feats.component'
import { mockStore } from '../../utils/mocks'

describe('FeatsComponent', () => {
    let component: FeatsComponent
    let fixture: ComponentFixture<FeatsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FeatsComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(FeatsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
