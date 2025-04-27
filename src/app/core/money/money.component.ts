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
            const changeValueCopper = this.convertToCopper(changeValue)

            const currentValueCopper = this.convertToCopper(money)
            const newValueCopper = currentValueCopper + changeValueCopper
            const newValue = this.convertFromCopper(newValueCopper)

            this.store.dispatch(updateMoney({ money: newValue }))
        })
    }

    onPay() {
        this.money$.pipe(take(1)).subscribe((money: IMoney) => {
            const changeValue = this.moneyChangeForm.getRawValue() as IMoney
            const changeValueCopper = this.convertToCopper(changeValue)

            const currentValueCopper = this.convertToCopper(money)
            const newValueCopper = currentValueCopper - changeValueCopper
            const newValue = this.convertFromCopper(newValueCopper)

            this.store.dispatch(updateMoney({ money: newValue }))
        })
    }

    private convertToCopper(money: IMoney): number {
        return money.cp + money.sp * 10 + money.gp * 100 + money.pp * 1000
    }

    private convertFromCopper(copper: number): IMoney {
        return {
            cp: copper % 10,
            sp: Math.floor((copper / 10) % 10),
            gp: Math.floor((copper / 100) % 10),
            pp: Math.floor(copper / 1000),
        }
    }
}
