import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TitleIconsComponent } from './title-icons.component'
import { ActivatedRoute } from '@angular/router'

describe('TitleIconsComponent', () => {
    let component: TitleIconsComponent
    let fixture: ComponentFixture<TitleIconsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TitleIconsComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {},
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(TitleIconsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
