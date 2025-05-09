import { Component } from '@angular/core'
import { CampOutlineComponent } from './fragments/camp-outline/camp-outline.component'

@Component({
    selector: 'app-camp-page',
    imports: [CampOutlineComponent],
    templateUrl: './camp-page.component.html',
    styleUrl: './camp-page.component.scss',
})
export class CampPageComponent {}
