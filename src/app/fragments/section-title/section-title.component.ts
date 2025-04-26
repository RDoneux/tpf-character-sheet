import { Component, input, InputSignal } from '@angular/core'

@Component({
    selector: 'app-section-title',
    imports: [],
    templateUrl: './section-title.component.html',
    styleUrl: './section-title.component.scss',
})
export class SectionTitleComponent {
    title: InputSignal<string> = input.required<string>()
}
