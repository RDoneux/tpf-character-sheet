import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CampMembersComponent } from './camp-members.component'

describe('CampMembersComponent', () => {
    let component: CampMembersComponent
    let fixture: ComponentFixture<CampMembersComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CampMembersComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(CampMembersComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
