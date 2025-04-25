import { UpperCasePipe } from '@angular/common'
import { Component, input, InputSignal, output } from '@angular/core'

@Component({
    selector: 'app-configuration-badge',
    imports: [UpperCasePipe],
    templateUrl: './configuration-badge.component.html',
    styleUrl: './configuration-badge.component.scss',
})
export class ConfigurationBadgeComponent {
    title: InputSignal<string> = input.required<string>()
    value: InputSignal<string | number | null> = input.required<string | number | null>()

    onClick = output<void>()

    handleClick() {
        this.onClick.emit()
    }
}
