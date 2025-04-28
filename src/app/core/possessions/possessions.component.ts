import { AfterViewInit, Component, DestroyRef, ViewChild } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { IPossessionForm, IPossession, emptyPossession } from './interfaces/i-possessions'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'
import { PossessionModalComponent } from './fragments/possession-modal/possession-modal.component'
import { MatButtonModule } from '@angular/material/button'
import { deletePossession } from './state/possessions.actions'
import { ConfirmModalComponent } from '../../fragments/confirm-modal/confirm-modal.component'
import { v4 } from 'uuid'

@Component({
    selector: 'app-possessions',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './possessions.component.html',
    styleUrl: './possessions.component.scss',
})
export class PossessionsComponent implements AfterViewInit {
    constructor(
        private store: Store<{ possessions: IPossession[] }>,
        private destroyRef: DestroyRef,
        private dialog: MatDialog
    ) {}

    @ViewChild(MatSort) sort!: MatSort

    possessions$!: Observable<IPossession[]>
    possessionsForm!: FormArray<FormGroup<IPossessionForm>>
    displayedColumns: string[] = ['name', 'quantity', 'weight', 'actions']
    dataSource = new MatTableDataSource<IPossession>([])

    ngAfterViewInit() {
        this.possessions$ = this.store.select((state: { possessions: IPossession[] }) => state.possessions)
        this.dataSource.sort = this.sort
        this.possessions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: Partial<IPossession>[]) => {
            this.dataSource.data = value as IPossession[]
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
        this.dataSource.filter = filterValue.trim().toLowerCase()
    }

    openPossessionDialog(possession?: IPossession) {
        this.dialog.open(PossessionModalComponent, {
            data: {
                possession: possession ?? { ...emptyPossession, id: v4() },
                isNew: possession ? false : true,
            },
        })
    }

    onDeletePossession(possession: IPossession) {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            data: { title: `Are you sure you want to remove the ${possession.name} possession?` },
        })

        dialogRef
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                result && this.store.dispatch(deletePossession({ possessionId: possession.id }))
            })
    }
}
