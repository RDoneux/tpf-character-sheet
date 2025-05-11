import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { CreateCampComponent } from './create-camp.component'
import { provideHttpClient } from '@angular/common/http'
import { mockStore } from '../../../../../../utils/mocks'

describe('CreateCampComponent', () => {
    let component: CreateCampComponent
    let fixture: ComponentFixture<CreateCampComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateCampComponent],
            providers: [provideHttpClient(), provideHttpClientTesting(), mockStore],
        }).compileComponents()

        fixture = TestBed.createComponent(CreateCampComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
