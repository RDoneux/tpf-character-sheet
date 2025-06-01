import { Component, input } from '@angular/core'
import { ISummonedCreature } from '../../interfaces/i-summoned-creatures'
import { MatIconModule } from '@angular/material/icon'
import { AbbreviateAbilityPipe } from '../../../../pipes/abbreviate-ability.pipe'
import { SummonedCreatureTypeImageComponent } from '../summoned-creature-type-image/summoned-creature-type-image.component'

@Component({
    selector: 'app-summoned-creature-card',
    imports: [MatIconModule, AbbreviateAbilityPipe, SummonedCreatureTypeImageComponent],
    templateUrl: './summoned-creature-card.component.html',
    styleUrl: './summoned-creature-card.component.scss',
})
export class SummonedCreatureCardComponent {
    summonedCreature = input.required<ISummonedCreature>()

    get abilities() {
        return Object.entries(this.summonedCreature().abilities)
    }

    get skills() {
        return Object.entries(this.summonedCreature().skills)
    }

    get feats() {
        return typeof this.summonedCreature().feats === 'object'
            ? Object.values(this.summonedCreature().feats)
            : this.summonedCreature().feats
    }

    ngOnInit() {}
}
