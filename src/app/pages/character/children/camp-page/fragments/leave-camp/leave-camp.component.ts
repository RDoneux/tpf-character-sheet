import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { Store } from '@ngrx/store'
import { updateCampCode } from '../../state/camp.actions'

@Component({
    selector: 'app-leave-camp',
    imports: [MatButtonModule],
    templateUrl: './leave-camp.component.html',
    styleUrl: './leave-camp.component.scss',
})
export class LeaveCampComponent {
    constructor(private store: Store) {}

    onLeaveCamp() {
        this.store.dispatch(updateCampCode({ campCode: null }))
    }
}
