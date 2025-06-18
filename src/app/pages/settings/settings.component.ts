import { Component, DestroyRef } from '@angular/core'
import { SettingsService } from '../../services/settings/settings.service'
import { ISettings, ISettingsForm, IUser } from '../../services/settings/interfaces/i-settings'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { AsyncPipe, Location } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { ExportService } from '../../services/export/export.service'
import { MatDialog } from '@angular/material/dialog'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ConfirmModalComponent } from '../../fragments/confirm-modal/confirm-modal.component'
import { ImportCharacterModalComponent } from './fragments/import-character-modal/import-character-modal.component'
import { LoginComponent } from './fragments/login/login.component'
import { map, Observable } from 'rxjs'
import { RequireLoginDirective } from '../../directives/require-login.directive'

@Component({
    selector: 'app-settings',
    imports: [
        MatCheckboxModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        LoginComponent,
        RequireLoginDirective,
    ],
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

    get user(): Observable<IUser | null> {
        return this.settingsService.getSettings$<{ user: ISettings['user'] }>(['user']).pipe(
            takeUntilDestroyed(this.destroyRef),
            map((settings) => settings.user)
        )
    }

    ngOnInit() {
        this.form = buildForm<ISettings>(this.settingsService.settings())
        this.form.valueChanges.subscribe((settings: Partial<ISettings>) => {
            this.settingsService.updateSettings(settings)
        })
    }

    onOpenInputModal() {
        const dialogRef = this.dialog.open(ImportCharacterModalComponent)

        dialogRef.afterClosed().subscribe((result) => {
            this.onImport(result.characterName)
        })
    }

    onImport(characterName: string) {
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
                    this.exportService.importCharacterFromJSON(characterName)
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
