import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from '../../../../../../environments/environment'
import { ICamp } from '../interfaces/i-camp'

@Injectable({
    providedIn: 'root',
})
export class CampPageService {
    constructor(private httpClient: HttpClient) {}

    createCamp(name: string, description: string): Observable<string> {
        return this.httpClient
            .post<{ code: string }>(`${environment.campUrl}`, { name, description })
            .pipe(map((response: { code: string }) => response.code))
    }

    getCampDetails(campCode: string): Observable<ICamp> {
        return this.httpClient.get<ICamp>(`${environment.campUrl}?code=${campCode}`)
    }
}
