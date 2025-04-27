import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { ExperienceComponent } from '../../../../core/experience/experience.component'

@Component({
    selector: 'app-title-icons',
    imports: [MatIconModule, RouterLink, ExperienceComponent],
    templateUrl: './title-icons.component.html',
    styleUrl: './title-icons.component.scss',
})
export class TitleIconsComponent {}
