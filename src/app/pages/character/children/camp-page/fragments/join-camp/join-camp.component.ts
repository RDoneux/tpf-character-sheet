import { Component, TemplateRef, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Store } from '@ngrx/store'
import { updateCamp } from '../../state/camp.actions'
import { CampPageService } from '../../services/camp-page.service'
import { ICamp } from '../../interfaces/i-camp'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
    selector: 'app-join-camp',
    imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    templateUrl: './join-camp.component.html',
    styleUrl: './join-camp.component.scss',
})
export class JoinCampComponent {
    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private store: Store,
        private campPageService: CampPageService,
        private snackBar: MatSnackBar
    ) {}

    @ViewChild('joinCampDialog') joinCampDialog!: TemplateRef<any>

    joinCampForm!: FormGroup

    ngOnInit() {
        this.joinCampForm = this.formBuilder.group({
            campCode: ['', Validators.required],
        })

        this.joinCampForm.get('campCode')?.valueChanges.subscribe((value) => {
            this.joinCampForm.get('campCode')?.setValue(value.toUpperCase(), { emitEvent: false })
        })
    }

    openJoinCampDialog() {
        this.dialog.open(this.joinCampDialog)
    }

    onJoinCamp() {
        this.dialog.closeAll()
        this.campPageService.getCampDetails(this.joinCampForm.value.campCode.toUpperCase()).subscribe({
            next: (camp: ICamp) => this.store.dispatch(updateCamp({ camp })),
            error: (error: any) =>
                this.snackBar.open(`Error getting camp details, ${error.message}`, 'Close', {
                    panelClass: 'snackbar-error',
                }),
        })
    }
}
