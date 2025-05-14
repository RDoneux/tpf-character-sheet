import { Component, DestroyRef, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { emptyFeat, IFeat } from './interfaces/i-feat'
import { CommonModule } from '@angular/common'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { FeatsModalComponent } from './fragments/feats-modal/feats-modal.component'
import { v4 } from 'uuid'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatIconModule } from '@angular/material/icon'
import { ConfirmModalComponent } from '../../fragments/confirm-modal/confirm-modal.component'
import { removeFeat } from './state/feats.actions'

@Component({
    selector: 'app-feats',
    imports: [CommonModule, MatTableModule, MatSortModule, MatButtonModule, MatIconModule],
    templateUrl: './feats.component.html',
    styleUrl: './feats.component.scss',
})
export class FeatsComponent {
    constructor(
        private store: Store<{ feats: IFeat[] }>,
        private dialog: MatDialog,
        private destroyRef: DestroyRef
    ) {}

    @ViewChild(MatSort) sort!: MatSort

    feats$!: Observable<IFeat[]>
    displayedColumns: string[] = ['name', 'description', 'actions']
    dataSource = new MatTableDataSource<IFeat>([])

    ngOnInit() {
        this.feats$ = this.store.select((state: { feats: IFeat[] }) => state.feats)
        this.dataSource.sort = this.sort
        this.feats$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: Partial<IFeat>[]) => {
            this.dataSource.data = value as IFeat[]
        })
    }

    openFeatDialog(feat?: IFeat) {
        this.dialog.open(FeatsModalComponent, {
            width: '80%',
            data: { feat: feat ?? { ...emptyFeat, id: v4() }, isNew: feat ? false : true },
        })
    }

    onDeleteFeat(feat: IFeat) {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            data: { title: `Are you sure you want to remove the ${feat.name} feat?` },
        })

        dialogRef
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                result && this.store.dispatch(removeFeat({ featId: feat.id }))
            })
    }
}
