import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BackstoryComponent } from './backstory.component'
import { mockStore } from '../../utils/mocks'

describe('BackstoryComponent', () => {
    let component: BackstoryComponent
    let fixture: ComponentFixture<BackstoryComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BackstoryComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(BackstoryComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
