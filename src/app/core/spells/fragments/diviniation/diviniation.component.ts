import { Component, input, InputSignal, TemplateRef, ViewChild } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { SpellSchool } from '../../interfaces/i-spells'

@Component({
    selector: 'app-diviniation',
    imports: [],
    templateUrl: './diviniation.component.html',
    styleUrl: './diviniation.component.scss',
})
export class DiviniationComponent {
    prepared: InputSignal<boolean> = input.required<boolean>()
    school: InputSignal<SpellSchool> = input.required<SpellSchool>()

    @ViewChild('diviniation', { static: true }) diviniation!: TemplateRef<any>
    @ViewChild('abjuration', { static: true }) abjuration!: TemplateRef<any>

    // getLayerTemplate(): TemplateRef<any> {
    //   switch(this.school()) {
    //     case SpellSchool.Divination:
    //       return this.diviniation;
    //     case SpellSchool.Abjuration:
    //       return this.abjuration
    //     default:
    //       throw new Error(`No template found for school: ${this.school()}`);
    //   }
    // }
}
