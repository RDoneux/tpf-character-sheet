import { Component, DestroyRef, InputSignal, model, signal, WritableSignal } from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { ISpellLevel, ISpells } from '../../interfaces/i-spells'
import { Store } from '@ngrx/store'
import { updateSpellLevelCasts } from '../../state/spells.actions'
import { MatIconModule } from '@angular/material/icon'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
    selector: 'app-cast-counter',
    imports: [MatCheckboxModule, MatIconModule],
    templateUrl: './cast-counter.component.html',
    styleUrl: './cast-counter.component.scss',
})
export class CastCounterComponent {
    spellLevelTitle: InputSignal<keyof ISpells> = model.required<keyof ISpells>()
    casts: WritableSignal<boolean[]> = signal<boolean[]>([])

    constructor(
        private store: Store<{ spells: ISpells }>,
        private destroyRef: DestroyRef
    ) {}

    ngOnInit() {
        const spellLevel$ = this.store.select((state: { spells: ISpells }) => state.spells[this.spellLevelTitle()])
        spellLevel$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((casts: ISpellLevel) => {
            this.casts.set(casts.casts)
        })
    }

    onCheckboxChange(event: Event, index: number) {
        const target = event.target as HTMLInputElement
        const tempCasts = [...this.casts()]
        tempCasts[index] = target.checked
        this.store.dispatch(updateSpellLevelCasts({ spellLevel: this.spellLevelTitle(), casts: tempCasts }))
    }

    reset(event: Event) {
        event.stopPropagation()
        this.casts.set(this.casts().map(() => false))
        this.store.dispatch(updateSpellLevelCasts({ spellLevel: this.spellLevelTitle(), casts: this.casts() }))
    }
}
