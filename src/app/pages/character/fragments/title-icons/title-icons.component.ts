import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-title-icons',
    imports: [MatIconModule, RouterLink],
    templateUrl: './title-icons.component.html',
    styleUrl: './title-icons.component.scss',
})
export class TitleIconsComponent {
    constructor() {}

    onOpenHome() {}

    onOpenBackground() {}
}
