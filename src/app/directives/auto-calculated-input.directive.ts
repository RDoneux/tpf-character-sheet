import { Directive, inject, Optional, Self } from '@angular/core'
import { SettingsService } from '../services/settings/settings.service'
import { NgControl } from '@angular/forms'

@Directive({
    selector: '[autoCalculatedInput]',
    standalone: true,
})
export class AutoCalculatedInputDirective {
    private settingsService = inject(SettingsService)

    constructor(@Optional() @Self() private ngControl: NgControl) {}

    ngOnInit() {
        this.settingsService.autoCalculateFields$.subscribe((autoCalculateFields: boolean) => {
            if (this.ngControl?.control) {
                autoCalculateFields
                    ? this.ngControl.control.disable({ emitEvent: false })
                    : this.ngControl.control.enable({ emitEvent: false })
            }
        })
    }
}
