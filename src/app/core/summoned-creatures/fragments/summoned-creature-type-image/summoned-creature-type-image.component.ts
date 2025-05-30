import { Component, input } from '@angular/core'

@Component({
    selector: 'app-summoned-creature-type-image',
    imports: [],
    templateUrl: './summoned-creature-type-image.component.html',
    styleUrl: './summoned-creature-type-image.component.scss',
})
export class SummonedCreatureTypeImageComponent {
    type = input.required<string>()
}
