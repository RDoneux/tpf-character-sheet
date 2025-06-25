import {
    afterNextRender,
    Component,
    computed,
    DestroyRef,
    inject,
    Injector,
    model,
    ModelSignal,
    Signal,
    ViewChild,
} from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { CharacterClassLevel, IBackground, IBackgroundForm } from './interfaces/i-background'
import { Store } from '@ngrx/store'
import { combineLatest, debounceTime, firstValueFrom, map, Observable } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { addClass, removeClass, updateBackground, updateBackgroundWeight } from './state/background.actions'
import { buildForm } from '../../utils/form'
import { MatSelectModule } from '@angular/material/select'
import { CharacterAlignment, CharacterClass, CharacterRace, CharacterSize } from '../../types/game'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { IGear } from '../gear/interfaces/i-gear'
import { IPossession } from '../possessions/interfaces/i-possessions'
import { SettingsService } from '../../services/settings/settings.service'
import { AutoCalculatedInputDirective } from '../../directives/auto-calculated-input.directive'
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips'
import { AsyncPipe } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { values } from 'lodash-es'

@Component({
    selector: 'app-background',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        AutoCalculatedInputDirective,
        MatChipsModule,
        AsyncPipe,
        MatIconModule,
        MatAutocompleteModule,
    ],
    templateUrl: './background.component.html',
    styleUrl: './background.component.scss',
})
export class BackgroundComponent {
    private _injector = inject(Injector)
    readonly separatorKeysCodes: number[] = [ENTER, COMMA]

    constructor(
        private store: Store<{ background: IBackground; gear: IGear; possessions: IPossession[] }>,
        private destroyRef: DestroyRef,
        private settingsService: SettingsService
    ) {}

    @ViewChild('autosize') autosize!: CdkTextareaAutosize

    background$!: Observable<IBackground>
    backgroundForm!: FormGroup<IBackgroundForm>

    classFilter: ModelSignal<string> = model<string>('')
    filteredClasses: Signal<string[]> = computed(() => {
        const filterValue = this.classFilter().toLowerCase()
        return this.classOptions.filter((option: string) => option.toLowerCase().includes(filterValue))
    })

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
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    debounceTime(200),
                    map((value: Partial<IBackground>) => this.verifyClassesAreArray(value))
                )
                .subscribe((value: IBackground) => {
                    this.store.dispatch(updateBackground({ background: value as IBackground }))
                })
            this.background$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: IBackground) => {
                this.backgroundForm?.patchValue(value, { emitEvent: false })
            })
        })

        if (!this.settingsService.settings().autoCalculateFields) return

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

    onRemoveClass(characterClassLevel: CharacterClassLevel) {
        this.store.dispatch(removeClass({ characterClassLevel }))
    }

    onAddClass(event: MatChipInputEvent) {
        const clazz = { class: event.value.trim(), level: 0 }
        this.store.dispatch(addClass({ characterClassLevel: clazz }))
        event.chipInput.clear()
    }

    classSelected(event: MatAutocompleteSelectedEvent) {
        const clazz = { class: event.option.viewValue.trim(), level: 0 }
        if (clazz) {
            this.store.dispatch(addClass({ characterClassLevel: clazz }))
        }
        event.source.closed.emit()
        event.option.deselect()
        this.classFilter.set('')
    }

    private verifyClassesAreArray(background: Partial<IBackground>): IBackground {
        return {
            ...background,
            classes: Array.isArray(background.classes) ? background.classes : Object.values(background.classes ?? {}),
        } as IBackground
    }
}
