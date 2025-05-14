import { Component, signal, WritableSignal } from '@angular/core'
import { BackgroundComponent } from '../../../../core/background/background.component'
import { PageDivideMenuComponent } from '../../fragments/page-divide-menu/page-divide-menu.component'
import { FeatsComponent } from '../../../../core/feats/feats.component'

const BackgroundPagePageDividers = {
    DETAILS: 'Details',
    FEATS: 'Feats',
} as const
type BackgroundPagePageDividers = (typeof BackgroundPagePageDividers)[keyof typeof BackgroundPagePageDividers]

@Component({
    selector: 'app-background-page',
    imports: [BackgroundComponent, PageDivideMenuComponent, FeatsComponent],
    templateUrl: './background-page.component.html',
    styleUrl: './background-page.component.scss',
})
export class BackgroundPageComponent {
    readonly pageDividers = Object.values(BackgroundPagePageDividers)
    readonly pageDividersType = BackgroundPagePageDividers

    selectedPage: WritableSignal<string> = signal(this.pageDividers[0])

    onPageSelected(page: string) {
        this.selectedPage.set(page)
    }
}
