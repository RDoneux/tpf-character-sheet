import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core'
import { ISkill } from '../../interfaces/i-skills'
import { AbbreviateAbilityPipe } from '../../../../pipes/abbreviate-ability.pipe'
import { MatIconModule } from '@angular/material/icon'

@Component({
    selector: 'app-skill-title',
    imports: [AbbreviateAbilityPipe, MatIconModule],
    templateUrl: './skill-title.component.html',
    styleUrl: './skill-title.component.scss',
})
export class SkillTitleComponent {
    skill: InputSignal<ISkill> = input.required()

    deleteSkill: OutputEmitterRef<string> = output<string>()
    addSkill: OutputEmitterRef<ISkill> = output<ISkill>()

    get hasSpecialisation() {
        return this.skill().specialisation !== null
    }

    get canDelete() {
        return this.skill().specialisation?.canDelete
    }

    onDeleteSkill() {
        this.deleteSkill.emit(this.skill().id)
    }

    onAddSkill() {
        this.addSkill.emit(this.skill())
    }
}
