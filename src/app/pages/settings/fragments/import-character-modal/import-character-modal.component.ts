import { Component, signal, WritableSignal } from '@angular/core'
import { SettingsService } from '../../../../services/settings/settings.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
    selector: 'app-import-character-modal',
    imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, MatButtonModule],
    templateUrl: './import-character-modal.component.html',
    styleUrl: './import-character-modal.component.scss',
})
export class ImportCharacterModalComponent {
    characterSheetList: WritableSignal<string[]> = signal([])
    filteredCharacterSheetList: WritableSignal<string[]> = signal([])

    filterForm = new FormGroup({
        name: new FormControl(''),
    })

    get selectedCharacterName(): string {
        return this.filterForm?.get('name')?.value || ''
    }

    constructor(
        private settingsService: SettingsService,
        private snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<ImportCharacterModalComponent>
    ) {}

    ngOnInit() {
        this.settingsService.getCharacterSheetList$().subscribe({
            next: (characterSheetList: string[]) => {
                this.filteredCharacterSheetList.set(characterSheetList)
                this.characterSheetList.set(characterSheetList)
            },
            error: (error: any) =>
                this.snackBar.open(`Failed to load character sheet list: ${(error as Error).message}`, 'Close'),
        })
    }

    onCharacterSheetFilterChange(event: Event) {
        const target: HTMLInputElement = event.target as HTMLInputElement
        this.filteredCharacterSheetList.set(
            this.characterSheetList().filter((option) => option.toLowerCase().includes(target.value.toLowerCase()))
        )
    }

    onImport() {
        this.dialogRef.close({
            characterName: this.filterForm.get('name')?.value,
        })
    }
}
