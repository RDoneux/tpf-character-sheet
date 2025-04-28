import { afterNextRender, Component, DestroyRef, inject, Injector, ViewChild } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { IBackground, IBackgroundForm } from './interfaces/i-background'
import { Store } from '@ngrx/store'
import { combineLatest, debounceTime, firstValueFrom, Observable } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { updateBackground, updateBackgroundWeight } from './state/background.actions'
import { buildForm } from '../../utils/form'
import { MatSelectModule } from '@angular/material/select'
import { CharacterAlignment, CharacterClass, CharacterRace, CharacterSize } from '../../types/game'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { IGear } from '../gear/interfaces/i-gear'
import { IPossession } from '../possessions/interfaces/i-possessions'

@Component({
    selector: 'app-background',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
    templateUrl: './background.component.html',
    styleUrl: './background.component.scss',
})
export class BackgroundComponent {
    private _injector = inject(Injector)

    constructor(
        private store: Store<{ background: IBackground; gear: IGear; possessions: IPossession[] }>,
        private destroyRef: DestroyRef
    ) {}

    @ViewChild('autosize') autosize!: CdkTextareaAutosize

    background$!: Observable<IBackground>
    backgroundForm!: FormGroup<IBackgroundForm>

    get classOptions(): string[] {
        return Object.values(CharacterClass)
    }

    get raceOptions(): string[] {
        return Object.values(CharacterRace)
    }

    get alignmentOptions(): string[] {
        return Object.values(CharacterAlignment)
    }

    get sizeOptions(): string[] {
        return Object.values(CharacterSize)
    }

    ngOnInit() {
        this.background$ = this.store.select((state: { background: IBackground }) => state.background)

        firstValueFrom(this.background$).then((background: IBackground) => {
            this.backgroundForm = buildForm<IBackground>(background)
            this.backgroundForm.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(200))
                .subscribe((value: Partial<IBackground>) => {
                    this.store.dispatch(updateBackground({ background: value as IBackground }))
                })
            this.background$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IBackground) => {
                this.backgroundForm?.patchValue(value, { emitEvent: false })
            })
        })

        const gear$ = this.store.select((state: { gear: IGear }) => state.gear)
        const possessions$ = this.store.select((state: { possessions: IPossession[] }) => state.possessions)

        combineLatest([gear$, possessions$])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(([gear, possessions]) => {
                const gearWeight = gear.totalWeight
                const possessionsWeight = possessions.reduce((total: number, item: { weight: number }) => {
                    return total + item.weight
                }, 0)
                const totalWeight = gearWeight + possessionsWeight
                this.store.dispatch(updateBackgroundWeight({ weight: totalWeight }))
            })
    }

    triggerResize() {
        // Wait for content to render, then trigger textarea resize.
        afterNextRender(
            () => {
                this.autosize.resizeToFitContent(true)
            },
            {
                injector: this._injector,
            }
        )
    }
}
