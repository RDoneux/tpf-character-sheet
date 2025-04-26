import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BackgroundPageComponent } from './background-page.component'
import { mockStore } from '../../../../utils/mocks'

describe('BackgroundComponent', () => {
    let component: BackgroundPageComponent
    let fixture: ComponentFixture<BackgroundPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BackgroundPageComponent],
            providers: [mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(BackgroundPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
