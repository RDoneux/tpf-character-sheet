import { Component, DestroyRef, TemplateRef, ViewChild } from '@angular/core'
import { IMoney, IMoneyForm } from './interfaces/i-money'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { firstValueFrom, Observable, take } from 'rxjs'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { updateMoney } from './state/money.actions'
import { AsyncPipe } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatButtonModule } from '@angular/material/button'
import { convertToCopper, convertFromCopper } from '../../utils/game'

@Component({
    selector: 'app-money',
    imports: [AsyncPipe, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
    templateUrl: './money.component.html',
    styleUrl: './money.component.scss',
})
export class MoneyComponent {
    constructor(
        private store: Store<{ money: IMoney }>,
        private destroyRef: DestroyRef,
        private formBuilder: FormBuilder,
        private dialog: MatDialog
    ) {}

    @ViewChild('moneyDialog') moneyDialog!: TemplateRef<any>

    money$!: Observable<IMoney>
    moneyForm!: FormGroup<IMoneyForm>

    moneyChangeForm!: FormGroup<any>

    ngOnInit() {
        this.money$ = this.store.select((state: { money: IMoney }) => state.money)

        firstValueFrom(this.money$).then((money: IMoney) => {
            this.moneyForm = buildForm<IMoney>(money)
            this.moneyForm.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((value: Partial<IMoney>) => {
                    this.store.dispatch(updateMoney({ money: value as IMoney }))
                })

            this.money$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((money: IMoney) => {
                this.moneyForm.patchValue(money, { emitEvent: false })
            })
        })

        this.moneyChangeForm = this.formBuilder.group({
            cp: [0],
            sp: [0],
            gp: [0],
            pp: [0],
        })
    }

    openMoneyDialog() {
        this.dialog.open(this.moneyDialog)
    }

    onEarn() {
        this.money$.pipe(take(1)).subscribe((money: IMoney) => {
            const changeValue = this.moneyChangeForm.getRawValue() as IMoney
            const changeValueCopper = convertToCopper(changeValue)

            const currentValueCopper = convertToCopper(money)
            const newValueCopper = currentValueCopper + changeValueCopper
            const newValue = convertFromCopper(newValueCopper)

            this.store.dispatch(updateMoney({ money: newValue }))
        })
    }

    onPay() {
        this.money$.pipe(take(1)).subscribe((money: IMoney) => {
            const changeValue = this.moneyChangeForm.getRawValue() as IMoney
            const changeValueCopper = convertToCopper(changeValue)

            const currentValueCopper = convertToCopper(money)
            const newValueCopper = currentValueCopper - changeValueCopper
            const newValue = convertFromCopper(newValueCopper)

            this.store.dispatch(updateMoney({ money: newValue }))
        })
    }
}
