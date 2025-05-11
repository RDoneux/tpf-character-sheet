import { Component, DestroyRef, effect, signal, WritableSignal } from '@angular/core'
import { CampOutlineComponent } from './fragments/camp-outline/camp-outline.component'
import { Store } from '@ngrx/store'
import { ICamp, ICampDetails } from './interfaces/i-camp'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { CreateCampComponent } from './fragments/create-camp/create-camp.component'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../../environments/environment'
import { updateCampCode } from './state/camp.actions'
import { LeaveCampComponent } from './fragments/leave-camp/leave-camp.component'
import { JoinCampComponent } from './fragments/join-camp/join-camp.component'
import { CampMoneyComponent } from './fragments/camp-money/camp-money.component'

@Component({
    selector: 'app-camp-page',
    imports: [CampOutlineComponent, CreateCampComponent, LeaveCampComponent, CampMoneyComponent],
    templateUrl: './camp-page.component.html',
    styleUrl: './camp-page.component.scss',
})
export class CampPageComponent {
    campCode: WritableSignal<string | null> = signal<string | null>(null)
    campDetails: WritableSignal<ICampDetails | null> = signal<ICampDetails | null>(null)

    constructor(
        private store: Store<{ camp: ICamp }>,
        private destroyRef: DestroyRef,
        private http: HttpClient
    ) {
        effect(() => {
            const campCode = this.campCode()
            if (campCode) {
                this.http.get<ICampDetails>(environment.apiUrl + '/party/' + campCode).subscribe((response) => {
                    this.campDetails.set(response)
                })
            }
        })
    }

    ngOnInit() {
        this.store
            .select((state: { camp: ICamp }) => state.camp)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((camp: ICamp) => this.campCode.set(camp.campCode))
    }
}
