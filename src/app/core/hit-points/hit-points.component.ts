import { Component, DestroyRef, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core'
import { Store } from '@ngrx/store'
import { IHitPoints, IHitPointsForm, initialHitPointsState } from './interfaces/i-hitpoints'
import { debounceTime, firstValueFrom, Observable } from 'rxjs'
import { ConfigurationBadgeComponent } from '../../fragments/configuration-badge/configuration-badge.component'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { buildForm } from '../../utils/form'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { updateCurrentHitPoints, updateHitPoints } from './state/hit-points.actions'

@Component({
    selector: 'app-hit-points',
    imports: [ConfigurationBadgeComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './hit-points.component.html',
    styleUrl: './hit-points.component.scss',
})
export class HitPointsComponent {
    public static readonly MINIMUM_HIT_POINTS = -9

    @ViewChild('hitPointsDialog') hitPointsDialog!: TemplateRef<any>

    damageAmount: WritableSignal<number> = signal<number>(1)

    hitPoints$!: Observable<IHitPoints>
    hitPointsForm!: FormGroup<IHitPointsForm>

    get hitPoints(): IHitPoints {
        return this.hitPointsForm?.getRawValue() ?? initialHitPointsState
    }

    get currentHitPoints(): number {
        return (this.hitPointsForm.get('currentHitPoints') as FormControl<number>).value
    }

    get maxHitPoints(): number {
        return (this.hitPointsForm.get('totalHitPoints') as FormControl<number>).value
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

        this.hitPoints$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IHitPoints) => {
            this.hitPointsForm?.patchValue(value, { emitEvent: false })
        })
    }

    openHitPointsDialog() {
        this.dialog.open(this.hitPointsDialog)
    }

    onDamageAmountChange(event: Event) {
        const target = event.target as HTMLInputElement
        const value = parseInt(target.value, 10)
        if (!isNaN(value)) {
            this.damageAmount.set(value)
        }
    }
    onHeal() {
        if (this.currentHitPoints + this.damageAmount() > this.maxHitPoints) {
            this.store.dispatch(updateCurrentHitPoints({ value: this.maxHitPoints }))
            return
        }
        this.store.dispatch(updateCurrentHitPoints({ value: this.currentHitPoints + this.damageAmount() }))
    }
    onDamage() {
        if (this.currentHitPoints - this.damageAmount() < HitPointsComponent.MINIMUM_HIT_POINTS) {
            this.store.dispatch(updateCurrentHitPoints({ value: HitPointsComponent.MINIMUM_HIT_POINTS }))
            return
        }
        this.store.dispatch(updateCurrentHitPoints({ value: this.currentHitPoints - this.damageAmount() }))
    }
}
