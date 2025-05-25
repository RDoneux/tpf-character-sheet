import { Component, DestroyRef, signal, WritableSignal } from '@angular/core'
import { initialSpellState, ISpell, ISpells } from './interfaces/i-spells'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { TitleCasePipe } from '../../pipes/title-case.pipe'
import { IExperience } from '../experience/interfaces/i-experience'
import { MatDialog } from '@angular/material/dialog'
import { SpellsModalComponent } from './fragments/spells-modal/spells-modal.component'
import { MatIconModule } from '@angular/material/icon'
import { sortBy } from 'lodash-es'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { addSpell } from './state/spells.actions'
import { v4 } from 'uuid'
import { CastCounterModalComponent } from './fragments/cast-counter-modal/cast-counter-modal.component'
import { SchoolImageComponent } from './fragments/school-image/school-image.component'

@Component({
    selector: 'app-spells',
    imports: [TitleCasePipe, MatIconModule, MatCardModule, MatButtonModule, SchoolImageComponent],
    templateUrl: './spells.component.html',
    styleUrl: './spells.component.scss',
})
export class SpellsComponent {
    constructor(
        private store: Store<{ spells: ISpells; experience: IExperience }>,
        private destroyRef: DestroyRef,
        private dialog: MatDialog
    ) {}

    spells$!: Observable<ISpells>
    dataSource!: ISpells

    characterLevel: WritableSignal<number> = signal(1)

    get spellLevelKeys(): (keyof ISpells)[] {
        return (Object.keys(this.dataSource) as (keyof ISpells)[]).filter(
            (_, index) => index < this.characterLevel() + 1
        )
    }

    ngOnInit() {
        this.spells$ = this.store.select((state: { spells: ISpells }) => state.spells)

        this.spells$
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                map((spells: ISpells) => this.sortSpellsByIsPrepared(spells))
            )
            .subscribe((spells: ISpells) => {
                this.dataSource = spells
            })

        const experience$ = this.store.select((state: { experience: IExperience }) => state.experience)
        experience$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((experience: IExperience) => {
            this.characterLevel.set(experience.level)
        })
    }

    openSpellDialog(spell: ISpell, spellLevel: keyof ISpells) {
        this.dialog.open(SpellsModalComponent, {
            data: {
                spell,
                spellLevel,
            },
            width: '90vw',
        })
    }

    onAddSpell(spellLevel: keyof ISpells) {
        const spell = { ...initialSpellState, id: v4() }
        this.store.dispatch(addSpell({ spellLevel, spell }))
        this.dialog.open(SpellsModalComponent, {
            data: {
                spell,
                spellLevel,
            },
            width: '90vw',
        })
    }

    openCastCounterModal(spellLevel: keyof ISpells) {
        this.dialog.open(CastCounterModalComponent, {
            data: {
                spellLevel,
            },
            width: 'fit-content',
        })
    }

    private sortSpellsByIsPrepared(spells: ISpells): ISpells {
        const sortedSpells: ISpells = {} as ISpells
        for (const level in spells) {
            if (spells.hasOwnProperty(level)) {
                sortedSpells[level as keyof ISpells] = {
                    ...spells[level as keyof ISpells],
                    spells: sortBy(spells[level as keyof ISpells].spells, 'isPrepared').reverse(),
                }
            }
        }
        return sortedSpells
    }
}
