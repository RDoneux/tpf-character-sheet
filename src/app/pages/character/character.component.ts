import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TitleIconsComponent } from './fragments/title-icons/title-icons.component'

@Component({
    selector: 'app-character',
    imports: [RouterOutlet, TitleIconsComponent],
    templateUrl: './character.component.html',
    styleUrl: './character.component.scss',
})
export class CharacterComponent {}
