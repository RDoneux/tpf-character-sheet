import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ConfigurationBadgeComponent } from './configuration-badge.component'

describe('ConfigurationBadgeComponent', () => {
    let component: ConfigurationBadgeComponent
    let fixture: ComponentFixture<ConfigurationBadgeComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConfigurationBadgeComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ConfigurationBadgeComponent)
        component = fixture.componentInstance
        const componentRef = fixture.componentRef
        componentRef.setInput('title', 'Test Title')
        componentRef.setInput('value', 'Test Value')
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
