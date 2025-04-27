import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink, RouterModule } from '@angular/router'
import { ExperienceComponent } from '../../../../core/experience/experience.component'
import { MoneyComponent } from '../../../../core/money/money.component'

@Component({
    selector: 'app-title-icons',
    imports: [MatIconModule, RouterLink, ExperienceComponent, RouterModule, MoneyComponent],
    templateUrl: './title-icons.component.html',
    styleUrl: './title-icons.component.scss',
})
export class TitleIconsComponent {}
