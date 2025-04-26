import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OverviewComponent } from './overview.component'
import { mockStore } from '../../../../utils/mocks'

describe('OverviewComponent', () => {
    let component: OverviewComponent
    let fixture: ComponentFixture<OverviewComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OverviewComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(OverviewComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
