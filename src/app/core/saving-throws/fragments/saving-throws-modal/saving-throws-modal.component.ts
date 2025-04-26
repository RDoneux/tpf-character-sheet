import { Component, Inject, signal, WritableSignal } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ISavingThrows, ISavingThrowsDefForm } from '../../interfaces/i-saving-throws'
import { UpperCasePipe } from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
    selector: 'app-saving-throws-modal',
    imports: [ReactiveFormsModule, UpperCasePipe, MatInputModule, MatFormFieldModule],
    templateUrl: './saving-throws-modal.component.html',
    styleUrl: './saving-throws-modal.component.scss',
})
export class SavingThrowsModalComponent {
    form: WritableSignal<FormGroup<ISavingThrowsDefForm>>
    key: WritableSignal<keyof ISavingThrows>

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { form: FormGroup<ISavingThrowsDefForm>; key: keyof ISavingThrows }
    ) {
        this.form = signal(data.form)
        this.key = signal(data.key)
    }
}
