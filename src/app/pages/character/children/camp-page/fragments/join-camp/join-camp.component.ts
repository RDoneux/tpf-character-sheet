import { Component, TemplateRef, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Store } from '@ngrx/store'
import { updateCampCode } from '../../state/camp.actions'

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
        private store: Store
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
        this.store.dispatch(updateCampCode({ campCode: this.joinCampForm.value.campCode.toUpperCase() }))
    }
}
