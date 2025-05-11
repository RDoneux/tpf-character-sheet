import {
    Component,
    computed,
    DestroyRef,
    effect,
    input,
    InputSignal,
    Signal,
    signal,
    TemplateRef,
    ViewChild,
    WritableSignal,
} from '@angular/core'
import { IMoney, initialMoneyState } from '../../../../../../core/money/interfaces/i-money'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { TransactionDirection } from './types/t-transaction-direction'
import { Store } from '@ngrx/store'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { convertFromCopper, convertToCopper } from '../../../../../../utils/game'
import { updateMoney } from '../../../../../../core/money/state/money.actions'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../../../../environments/environment'

@Component({
    selector: 'app-camp-money',
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
    templateUrl: './camp-money.component.html',
    styleUrl: './camp-money.component.scss',
})
export class CampMoneyComponent {
    campCopper: InputSignal<number> = input.required<number>()
    partyId: InputSignal<string> = input.required<string>()

    dynamicCampCopper: WritableSignal<number> = signal<number>(0)
    campMoney: Signal<IMoney> = computed(() => convertFromCopper(this.dynamicCampCopper()))
    playerMoney: WritableSignal<IMoney> = signal<IMoney>(initialMoneyState)
    campMoneyForm!: FormGroup

    transactionDirection: TransactionDirection = TransactionDirection.PLAYER_TO_CAMP

    @ViewChild('campMoneyDialog') campMoneyDialog!: TemplateRef<any>

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private store: Store<{ money: IMoney }>,
        private destroyRef: DestroyRef,
        private http: HttpClient
    ) {
        effect(() => {
            this.dynamicCampCopper?.set(this.campCopper())
        })
    }

    ngOnInit() {
        this.campMoneyForm = this.formBuilder.group({
            cp: [0],
            sp: [0],
            gp: [0],
            pp: [0],
        })
        this.store
            .select((state: { money: IMoney }) => state.money)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((money: IMoney) => this.playerMoney.set(money))
    }

    onOpenMoneyDialog() {
        this.dialog.open(this.campMoneyDialog)
    }

    onReverseTransactionDirection() {
        this.transactionDirection =
            this.transactionDirection === TransactionDirection.PLAYER_TO_CAMP
                ? TransactionDirection.CAMP_TO_PLAYER
                : TransactionDirection.PLAYER_TO_CAMP
    }

    onSend() {
        let playerCopper = convertToCopper(this.playerMoney())
        let campCopper = convertToCopper(this.campMoney())

        let transactionCopper = convertToCopper(this.campMoneyForm.getRawValue())

        if (this.transactionDirection === TransactionDirection.PLAYER_TO_CAMP) {
            if (transactionCopper > playerCopper) {
                transactionCopper = playerCopper
            }

            if (transactionCopper <= 0) return

            playerCopper -= transactionCopper
            campCopper += transactionCopper
        } else {
            if (transactionCopper > campCopper) {
                transactionCopper = campCopper
            }
            if (transactionCopper <= 0) return

            campCopper -= transactionCopper
            playerCopper += transactionCopper
        }

        const newPlayerMoney = convertFromCopper(playerCopper)
        this.dynamicCampCopper.set(campCopper)

        this.store.dispatch(updateMoney({ money: newPlayerMoney }))

        this.http
            .put(environment.apiUrl + `/party/${this.partyId()}/money`, { money: `${campCopper}` })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(console.log)
    }
}
