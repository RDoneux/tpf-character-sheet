import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PageDivideMenuComponent } from './page-divide-menu.component'

describe('PageDivideMenuComponent', () => {
    let component: PageDivideMenuComponent
    let fixture: ComponentFixture<PageDivideMenuComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageDivideMenuComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageDivideMenuComponent)
        component = fixture.componentInstance
        const componentRef = fixture.componentRef
        componentRef.setInput('dividers', ['Details', 'Feats'])
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
