import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private baseUrl: string = environment.baseUrl + "/api/v1/competitions";
  constructor(private http: HttpClient) { }

  findAllCompetition(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAllCompetitions(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createCompetition(competitionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, competitionData);
  }

  updateCompetition(competitionData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, competitionData);
  }

  deleteCompetition(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  searchCompetition(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search?name=${name}`);
  }

  registerInCompetition(code: string, memberId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/register?code=${code}&id_Member=${memberId}`, {});
  }
}
