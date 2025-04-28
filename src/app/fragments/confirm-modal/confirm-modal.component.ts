import { Component, Inject, signal, WritableSignal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
    selector: 'app-confirm-modal',
    imports: [MatButtonModule],
    templateUrl: './confirm-modal.component.html',
    styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
    title: WritableSignal<string> = signal('')

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { title: string },
        private dialogRef: MatDialogRef<ConfirmModalComponent>
    ) {
        this.title.set(data.title)
    }

    onChoice(choice: boolean) {
        this.dialogRef.close(choice)
    }
}
