import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CharacterComponent } from './character.component'
import { ActivatedRoute } from '@angular/router'
import { mockStore } from '../../utils/mocks'

describe('CharacterComponent', () => {
    let component: CharacterComponent
    let fixture: ComponentFixture<CharacterComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CharacterComponent],
            providers: [
                mockStore,
                {
                    provide: ActivatedRoute,
                    useValue: {},
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(CharacterComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
