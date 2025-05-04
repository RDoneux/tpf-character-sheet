import { Component } from '@angular/core'
import { version } from '../../../../package.json'
import { environment } from '../../../environments/environment'

@Component({
    selector: 'app-footer',
    imports: [],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
    version: string = version + environment.versionSuffix
}
