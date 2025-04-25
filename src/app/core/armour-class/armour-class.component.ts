import { Component } from '@angular/core'
import { IArmourClass } from './interfaces/i-armour-class'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { updateArmourClassTotal } from './state/armour-class.actions'

@Component({
    selector: 'app-armour-class',
    imports: [],
    templateUrl: './armour-class.component.html',
    styleUrl: './armour-class.component.scss',
})
export class ArmourClassComponent {
    constructor(private store: Store<{ armourClass: IArmourClass }>) {}

    armourClass$!: Observable<IArmourClass>

    ngOnInit() {
        this.armourClass$ = this.store.select((state: { armourClass: IArmourClass }) => state.armourClass)

        this.store.dispatch(updateArmourClassTotal({ total: 10 }))
    }
}
