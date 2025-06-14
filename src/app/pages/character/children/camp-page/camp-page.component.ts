import { Component, DestroyRef, signal, WritableSignal } from '@angular/core'
import { CampOutlineComponent } from './fragments/camp-outline/camp-outline.component'
import { Store } from '@ngrx/store'
import { ICamp } from './interfaces/i-camp'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { CreateCampComponent } from './fragments/create-camp/create-camp.component'
import { LeaveCampComponent } from './fragments/leave-camp/leave-camp.component'
import { CampPageService } from './services/camp-page.service'
import { firstValueFrom } from 'rxjs'
import { LoadingService } from '../../../../services/loading/loading.service'
import { CampMoneyComponent } from './fragments/camp-money/camp-money.component'

@Component({
    selector: 'app-camp-page',
    imports: [CampOutlineComponent, CreateCampComponent, LeaveCampComponent, CampMoneyComponent],
    templateUrl: './camp-page.component.html',
    styleUrl: './camp-page.component.scss',
})
export class CampPageComponent {
    camp: WritableSignal<ICamp | null> = signal<ICamp | null>(null)

    constructor(
        private store: Store<{ camp: ICamp }>,
        private destroyRef: DestroyRef,
        private campService: CampPageService,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.loadingService.setLoading(true)
        this.store
            .select((state: { camp: ICamp }) => state.camp)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(async (camp: ICamp) => {
                if (camp?.details?.code) {
                    camp = await firstValueFrom(this.campService.getCampDetails(camp.details.code))
                }
                this.camp.set(camp)
                this.loadingService.setLoading(false)
            })
    }
}
