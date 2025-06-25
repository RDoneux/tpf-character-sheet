import { Component, input, InputSignal, signal } from '@angular/core'
import { ICampMember } from '../../interfaces/i-camp'

@Component({
    selector: 'app-camp-members',
    imports: [],
    templateUrl: './camp-members.component.html',
    styleUrl: './camp-members.component.scss',
})
export class CampMembersComponent {
    members: InputSignal<ICampMember[]> = input.required<ICampMember[]>()
}
