import { afterNextRender, Component, inject, Injector, input, InputSignal, TemplateRef, ViewChild } from '@angular/core'
import {
    IArmour,
    IArmourForm,
    IProtectiveItem,
    IProtectiveItemForm,
    ISheildForm,
    IShield,
} from '../../interfaces/i-gear'
import { MatIconModule } from '@angular/material/icon'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDialog } from '@angular/material/dialog'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'

@Component({
    selector: 'app-gear-item',
    imports: [MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './gear-item.component.html',
    styleUrl: './gear-item.component.scss',
})
export class GearItemComponent {
    private _injector = inject(Injector)

    constructor(private dialog: MatDialog) {}

    item: InputSignal<IArmour | IShield | IProtectiveItem | null | undefined> = input.required<
        IArmour | IShield | IProtectiveItem | null | undefined
    >()
    itemForm: InputSignal<FormGroup<any>> = input.required<FormGroup<any>>()

    @ViewChild('gearItemDialog') gearItemDialog!: TemplateRef<any>
    @ViewChild('autosize') autosize!: CdkTextareaAutosize

    get hasCheckPenalty(): boolean {
        return this.itemForm().get('checkPenalty') ? true : false
    }

    get hasSpellFailureChance(): boolean {
        return this.itemForm().get('spellFailureChance') ? true : false
    }

    get hasMaxDex(): boolean {
        return this.itemForm().get('maxDex') ? true : false
    }

    get hasSpeed(): boolean {
        return this.itemForm().get('speed') ? true : false
    }

    openGearItemDialog() {
        this.dialog.open(this.gearItemDialog)
    }

    triggerResize() {
        // Wait for content to render, then trigger textarea resize.
        afterNextRender(
            () => {
                this.autosize.resizeToFitContent(true)
            },
            {
                injector: this._injector,
            }
        )
    }
}
