import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { IHitPoints } from './interfaces/i-hitpoints'
import { Observable } from 'rxjs'
import { updateHitPointsTotal } from './state/hit-points.actions'

@Component({
    selector: 'app-hit-points',
    imports: [],
    templateUrl: './hit-points.component.html',
    styleUrl: './hit-points.component.scss',
})
export class HitPointsComponent {
    constructor(private store: Store<{ hitPoints: IHitPoints }>) {}

    hitPoints$!: Observable<IHitPoints>

    ngOnInit() {
        this.hitPoints$ = this.store.select((state: { hitPoints: IHitPoints }) => state.hitPoints)

        this.store.dispatch(updateHitPointsTotal({ value: 10 }))
    }
}
