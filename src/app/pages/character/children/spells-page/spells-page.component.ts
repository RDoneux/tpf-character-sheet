import { Component, signal, WritableSignal } from '@angular/core'
import { SpellsComponent } from '../../../../core/spells/spells.component'
import { PageDivideMenuComponent } from '../../fragments/page-divide-menu/page-divide-menu.component'
import { SummonedCreaturesComponent } from '../../../../core/summoned-creatures/summoned-creatures.component'

const SpellsPagePageDividers = {
    SPELLS: 'Spells',
    SUMMONED_CREATURES: 'Summoned Creatures',
} as const
type SpellsPagePageDividers = (typeof SpellsPagePageDividers)[keyof typeof SpellsPagePageDividers]

@Component({
    selector: 'app-spells-page',
    imports: [SpellsComponent, PageDivideMenuComponent, SummonedCreaturesComponent, SummonedCreaturesComponent],
    templateUrl: './spells-page.component.html',
    styleUrl: './spells-page.component.scss',
})
export class SpellsPageComponent {
    readonly pageDividers = Object.values(SpellsPagePageDividers)
    readonly pageDividersType = SpellsPagePageDividers

    selectedPage: WritableSignal<string> = signal(this.pageDividers[0])

    onPageSelected(page: string) {
        this.selectedPage.set(page)
    }
}
