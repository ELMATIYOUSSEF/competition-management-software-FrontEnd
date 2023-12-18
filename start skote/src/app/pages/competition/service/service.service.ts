import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import { ApiResponseRanking, Competition, Fish, RequestHuntingVM } from '../competition.module';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private baseUrl: string = environment.baseUrl + "/api/v1/competitions";
  private baseUrlforFish: string = environment.baseUrl + "/api/v1/fishes";
  private baseUrlforhunting: string = environment.baseUrl + "/api/v1/hunting";
  private baseUrlRanks: string = environment.baseUrl + "/api/v1/ranking";
  constructor(private http: HttpClient) { }

  findAllCompetition(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAllCompetitions(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getCompetition(code:String):Observable<any> {
    return this.http.get(`${this.baseUrl}/${code}`);
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
  findallMembersinCompetition(memberId: number, code: string):any {
    return this.http.post(`${this.baseUrl}/ranks?code=${code}&memberId=${memberId}`, {});
  }
  findRankingByMemberAndCompetition(code: string): Observable<ApiResponseRanking> {
    return this.http.post<ApiResponseRanking>(`${this.baseUrl}/ranks?code=${code}`, {});
  }
  getAllFishs(): Observable<Fish> {
    return this.http.get<Fish>(`${this.baseUrlforFish}`);
  }
  addHunting(requestHuntingVM: RequestHuntingVM): Observable<any> {
    return this.http.post(`${this.baseUrlforhunting}`, requestHuntingVM);
  }
  
  getRanks(competitionCode: string) {
    return this.http.get<any>(`${this.baseUrlRanks}?code=${competitionCode}`);
  }
}
