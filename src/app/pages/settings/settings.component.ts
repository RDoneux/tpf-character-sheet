import { Component } from '@angular/core'
import { SettingsService } from '../../services/settings/settings.service'
import { ISettings, ISettingsForm } from '../../services/settings/interfaces/i-settings'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../utils/form'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { Location } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'

@Component({
    selector: 'app-settings',
    imports: [MatCheckboxModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent {
    constructor(
        private settingsService: SettingsService,
        private location: Location
    ) {}

    form!: FormGroup<ISettingsForm>

    ngOnInit() {
        this.form = buildForm<ISettings>(this.settingsService.settings())
        this.form.valueChanges.subscribe((settings: Partial<ISettings>) => {
            this.settingsService.updateSettings(settings)
        })
    }

    onDone() {
        this.location.back()
    }
}
