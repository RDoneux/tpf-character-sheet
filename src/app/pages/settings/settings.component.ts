import { Component, DestroyRef } from '@angular/core'
import { SettingsService } from '../../services/settings/settings.service'
import { ISettings, ISettingsForm } from '../../services/settings/interfaces/i-settings'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { Location } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { ExportService } from '../../services/export/export.service'
import { MatDialog } from '@angular/material/dialog'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ConfirmModalComponent } from '../../fragments/confirm-modal/confirm-modal.component'
import { LoadingService } from '../../services/loading/loading.service'

@Component({
    selector: 'app-settings',
    imports: [MatCheckboxModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent {
    constructor(
        private settingsService: SettingsService,
        private exportService: ExportService,
        private location: Location,
        private dialog: MatDialog,
        private destroyRef: DestroyRef
    ) {}

    form!: FormGroup<ISettingsForm>

    ngOnInit() {
        this.form = buildForm<ISettings>(this.settingsService.settings())
        this.form.valueChanges.subscribe((settings: Partial<ISettings>) => {
            this.settingsService.updateSettings(settings)
        })
    }

    onImport() {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            data: {
                title: `Are you sure you want to import the character? Doing so will override the current character`,
                confirmText: 'Import',
            },
        })

        dialogRef
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                if (result) {
                    this.exportService.importCharacterFromJSON()
                }
            })
    }

    onExport() {
        this.exportService.exportCharacterToJSON()
    }

    onDone() {
        this.location.back()
    }
}
