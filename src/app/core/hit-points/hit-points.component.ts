import { Component, DestroyRef, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core'
import { Store } from '@ngrx/store'
import { IHitPoints, IHitPointsForm, initialHitPointsState } from './interfaces/i-hitpoints'
import { debounceTime, firstValueFrom, Observable } from 'rxjs'
import { ConfigurationBadgeComponent } from '../../fragments/configuration-badge/configuration-badge.component'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { buildForm } from '../../utils/form'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { updateHitPoints } from './state/hit-points.actions'

@Component({
    selector: 'app-hit-points',
    imports: [ConfigurationBadgeComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './hit-points.component.html',
    styleUrl: './hit-points.component.scss',
})
export class HitPointsComponent {
    @ViewChild('hitPointsDialog') hitPointsDialog!: TemplateRef<any>

    damageAmount: WritableSignal<number> = signal<number>(1)

    hitPoints$!: Observable<IHitPoints>
    hitPointsForm!: FormGroup<IHitPointsForm>

    get hitPoints(): IHitPoints {
        return this.hitPointsForm?.getRawValue() ?? initialHitPointsState
    }

    constructor(
        private store: Store<{ hitPoints: IHitPoints }>,
        private dialog: MatDialog,
        private destroyRef: DestroyRef
    ) {}

    ngOnInit() {
        this.hitPoints$ = this.store.select((state: { hitPoints: IHitPoints }) => state.hitPoints)

        firstValueFrom(this.hitPoints$).then((hitPoints: IHitPoints) => {
            this.hitPointsForm = buildForm<IHitPoints>(hitPoints)
            this.hitPointsForm.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(200))
                .subscribe((value: Partial<IHitPoints>) => {
                    console.log('Hit Points Form Value Changed', value)
                    this.store.dispatch(updateHitPoints({ value: value as IHitPoints }))
                })
        })

        this.hitPoints$.subscribe((value: IHitPoints) => {
            this.hitPointsForm?.patchValue(value, { emitEvent: false })
        })
    }

    openHitPointsDialog() {
        this.dialog.open(this.hitPointsDialog)
    }

    onDamageAmountChange(event: Event) {}
    onHeal() {}
    onDamage() {}
}
