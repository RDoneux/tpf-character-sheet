import { Component, input, signal } from '@angular/core'

@Component({
    selector: 'app-summoned-creature-type-image',
    imports: [],
    templateUrl: './summoned-creature-type-image.component.html',
    styleUrl: './summoned-creature-type-image.component.scss',
})
export class SummonedCreatureTypeImageComponent {
    type = input.required<string>()
    mappedType = signal<string>('')

    ngOnInit() {
        this.mappedType.set(this.type())
        if (!this.mappedType()) {
            this.mappedType.set('Vermin')
        }
    }
}
