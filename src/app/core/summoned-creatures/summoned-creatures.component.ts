import { Component, DestroyRef } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ISummonedCreature } from './interfaces/i-summoned-creatures'
import { debounceTime, map, Observable, startWith } from 'rxjs'
import { SummonedCreaturesService } from './services/summoned-creatures.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AsyncPipe } from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { v4 } from 'uuid'
import { Store } from '@ngrx/store'
import { addSummonedCreature } from './state/summoned-creatures.actions'
import { SummonedCreatureCardComponent } from './fragments/summoned-creature-card/summoned-creature-card.component'
import { MatDialog } from '@angular/material/dialog'
import { SummonedCreatureModalComponent } from './fragments/summoned-creature-modal/summoned-creature-modal.component'

@Component({
    selector: 'app-summoned-creatures',
    imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        AsyncPipe,
        MatInputModule,
        SummonedCreatureCardComponent,
    ],
    templateUrl: './summoned-creatures.component.html',
    styleUrl: './summoned-creatures.component.scss',
})
export class SummonedCreaturesComponent {
    creatures!: ISummonedCreature[]
    summonedCreatures$!: Observable<ISummonedCreature[]>
    creatureOptions$!: Observable<ISummonedCreature[]>
    form!: FormGroup

    constructor(
        private formBuilder: FormBuilder,
        private summonedCreatureService: SummonedCreaturesService,
        private destroyRef: DestroyRef,
        private matSnackBar: MatSnackBar,
        private store: Store<{ summonedCreatures: ISummonedCreature[] }>,
        private dialog: MatDialog
    ) {}

    get nameSearchValue() {
        return this.form.get('search')?.value || ''
    }

    ngOnInit() {
        this.summonedCreatureService
            .getSummonedCreatures()
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                map((creatures: ISummonedCreature[]) =>
                    creatures.map((creature: ISummonedCreature) => ({
                        ...creature,
                        id: v4(),
                        currentHitPoints: '0',
                        maxHitPoints: '0',
                    }))
                )
            )
            .subscribe({
                next: (creatures: ISummonedCreature[]) => (this.creatures = creatures),
                error: (error: unknown) => {
                    this.matSnackBar.open(`Failed to load creatures: ${(error as Error).message}`, 'Close')
                },
            })

        this.summonedCreatures$ = this.store.select('summonedCreatures').pipe(takeUntilDestroyed(this.destroyRef))

        this.form = this.formBuilder.group({
            search: [''],
        })

        this.creatureOptions$ = this.form.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
            debounceTime(300),
            startWith(''),
            map(() => this.filterCreatures())
        )
    }

    onSelection(summonedCreature: ISummonedCreature) {
        this.store.dispatch(addSummonedCreature({ summonedCreature }))
        this.form.get('search')?.setValue('')
    }

    displayCreature(creature: ISummonedCreature): string {
        return creature ? creature.name : ''
    }

    onOpenDialog(summonedCreature: ISummonedCreature) {
        this.dialog.open(SummonedCreatureModalComponent, {
            data: summonedCreature,
            width: '90vw',
            maxWidth: '90vw',
        })
    }

    private filterCreatures(): ISummonedCreature[] {
        if (!this.creatures) return []
        if (typeof this.nameSearchValue !== 'string') return this.creatures
        return this.creatures.filter((creature: ISummonedCreature) =>
            creature.name?.toLowerCase()?.includes(this.nameSearchValue.toLowerCase())
        )
    }
}
