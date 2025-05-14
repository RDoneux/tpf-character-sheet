import { UpperCasePipe } from '@angular/common'
import { Component, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core'
import { SessionStorageService } from '../../../../services/session-storage.service'

@Component({
    selector: 'app-page-divide-menu',
    imports: [UpperCasePipe],
    templateUrl: './page-divide-menu.component.html',
    styleUrl: './page-divide-menu.component.scss',
})
export class PageDivideMenuComponent {
    readonly dividers: InputSignal<string[]> = input.required<string[]>()
    currentPage!: WritableSignal<string>

    pageSelected: OutputEmitterRef<string> = output<string>()

    constructor(private sessionStorage: SessionStorageService) {}

    ngOnInit() {
        const storedPage = this.sessionStorage.getItem<string>('currentPage')
        this.currentPage = signal(storedPage ?? this.dividers()[0])
        if (storedPage) {
            this.pageSelected.emit(storedPage)
        }
    }

    onPageSelected(page: string) {
        this.currentPage.set(page)
        this.pageSelected.emit(page)
        this.sessionStorage.setItem('currentPage', page)
    }
}
