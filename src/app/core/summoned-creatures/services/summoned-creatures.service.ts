import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { environment } from '../../../../environments/environment'
import { ISummonedCreature } from '../interfaces/i-summoned-creatures'

@Injectable({
    providedIn: 'root',
})
export class SummonedCreaturesService {
    constructor(private httpClient: HttpClient) {}

    getSummonedCreatures(): Observable<ISummonedCreature[]> {
        return this.httpClient.get<ISummonedCreature[]>(environment.summonedCreaturesUrl).pipe(
            map((creatures: ISummonedCreature[]) =>
                creatures.map((creature: ISummonedCreature) => ({
                    ...creature,
                    description: creature.description?.replace(/<[^>]*>/g, '') ?? '',
                }))
            )
        )
    }
}
