import { Component, input, InputSignal, TemplateRef, ViewChild } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { SpellSchool } from '../../interfaces/i-spells'

@Component({
    selector: 'app-school-image',
    imports: [],
    templateUrl: './school-image.component.html',
    styleUrl: './school-image.component.scss',
})
export class SchoolImageComponent {
    prepared: InputSignal<boolean> = input.required<boolean>()
    school: InputSignal<SpellSchool> = input.required<SpellSchool>()
    fit: InputSignal<'contain' | 'cover'> = input<'contain' | 'cover'>('cover')

    @ViewChild('diviniation', { static: true }) diviniation!: TemplateRef<any>
    @ViewChild('abjuration', { static: true }) abjuration!: TemplateRef<any>
}
