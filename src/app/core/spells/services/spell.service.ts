import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ISpell } from '../interfaces/i-spells'
import { environment } from '../../../../environments/environment'
import { map } from 'rxjs/operators'
import { LoadingService } from '../../../services/loading/loading.service'

@Injectable({
    providedIn: 'root',
})
export class SpellService {
    constructor(private httpClient: HttpClient) {}
    getSpells(): Observable<ISpell[]> {
        return this.httpClient.get<ISpell[]>(environment.spellSearchUrl).pipe(
            map((spells: ISpell[]) =>
                spells.map((spell: ISpell) => ({
                    ...spell,
                    description: spell.description?.replace(/<[^>]*>/g, '') ?? '',
                }))
            )
        )
    }
}
