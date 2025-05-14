import { Component, DestroyRef, TemplateRef, ViewChild } from '@angular/core'
import { SectionTitleComponent } from '../../fragments/section-title/section-title.component'
import { SettingsService } from '../../services/settings/settings.service'
import { ICombatMisc, ICombatMiscForm, initialCombatMiscState } from './interfaces/i-combat-misc'
import { Store } from '@ngrx/store'
import { debounceTime, firstValueFrom, map, Observable } from 'rxjs'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { buildForm } from '../../utils/form'
import { updateAllCombatMisc } from './state/combat-misc.actions'
import { CommonModule, UpperCasePipe } from '@angular/common'
import { IAbilities } from '../abilities/interfaces/i-abilities'
import { IBackground } from '../background/interfaces/i-background'
import { SizeGrappleModifierMap } from '../../types/modifier-maps'
import { CharacterSize } from '../../types/game'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDialog } from '@angular/material/dialog'
import { AutoCalculatedInputDirective } from '../../directives/auto-calculated-input.directive'

@Component({
    selector: 'app-combat-misc',
    imports: [
        SectionTitleComponent,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        AutoCalculatedInputDirective,
    ],
    templateUrl: './combat-misc.component.html',
    styleUrl: './combat-misc.component.scss',
})
export class CombatMiscComponent {
    constructor(
        private store: Store<{ combatMisc: ICombatMisc; abilities: IAbilities; background: IBackground }>,
        private destroyRef: DestroyRef,
        private settingsService: SettingsService,
        private dialog: MatDialog
    ) {}

    @ViewChild('combatMiscDialog') combatMiscDialog!: TemplateRef<any>

    combatMisc$!: Observable<ICombatMisc>
    combatMiscForm!: FormGroup<ICombatMiscForm>

    ngOnInit() {
        this.combatMisc$ = this.store.select((state: { combatMisc: ICombatMisc }) => state.combatMisc)

        firstValueFrom(this.combatMisc$).then((combatMisc: ICombatMisc) => {
            this.combatMiscForm = buildForm<ICombatMisc>(combatMisc)
            this.combatMiscForm.valueChanges
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    debounceTime(200),
                    map((combatMisc: Partial<ICombatMisc>) => this.calculateGrappleTotal(combatMisc))
                )
                .subscribe((value: Partial<ICombatMisc>) => {
                    this.store.dispatch(updateAllCombatMisc({ combatMisc: value as ICombatMisc }))
                })

            if (!this.settingsService.autoCalculateFields) return

            const abilities$ = this.store.select((state: { abilities: IAbilities }) => state.abilities)
            abilities$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((abilities: IAbilities) => {
                this.combatMiscForm.patchValue({ strengthModifier: abilities.strength?.modifier })
            })

            const background$ = this.store.select((state: { background: IBackground }) => state.background)
            background$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((background: IBackground) => {
                const { size } = background
                this.combatMiscForm.patchValue({
                    sizeModifier: SizeGrappleModifierMap[size ?? CharacterSize.MEDIUM],
                })
            })
        })

        this.combatMisc$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: ICombatMisc) => {
            this.combatMiscForm?.patchValue(value, { emitEvent: false })
        })
    }

    openCombatMiscDialog() {
        this.dialog.open(this.combatMiscDialog)
    }

    private calculateGrappleTotal(combatMisc: Partial<ICombatMisc>): ICombatMisc {
        if (!this.settingsService.autoCalculateFields) return combatMisc as ICombatMisc
        const grappleTotal =
            (combatMisc.strengthModifier ?? 0) +
            (combatMisc.baseAttackBonus ?? 0) +
            (combatMisc.sizeModifier ?? 0) +
            (combatMisc.miscModifier ?? 0)
        return { ...combatMisc, grappleTotal } as ICombatMisc
    }
}
