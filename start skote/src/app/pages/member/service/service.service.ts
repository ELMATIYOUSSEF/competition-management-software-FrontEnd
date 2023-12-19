import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import { classMember,Member } from '../member.module';
import { PaginatedResponse } from 'src/app/core/models/paginated.response.model';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseUrl: string = environment.baseUrl + "/api/v1/members";
  constructor(private http: HttpClient) { }

  private savedMember: Member | null = null;

/*  members$ = ( page: number = 0, size: number = 10): Observable<ApiResponse<Page <any>>> => 
    this.http.get<ApiResponse<Page<any>>>(`${this.baseUrl}?page=${page}&size=${size}`);*/

 findAllMember(page: number , size: number): Observable<PaginatedResponse<Member>>{
    return this.http.get<PaginatedResponse<Member>>(`${this.baseUrl}?page=${page}&size=${size}`);
 }
  createMember(memberData: any): Observable<any> {
    console.log(memberData);
    return this.http.post(`${this.baseUrl}`, memberData);
  }

  getMemberService(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}?id=${id}`);
  }

  updateMember(updatedMemberData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, updatedMemberData);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  searchMember(name: string , page: number , size: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/search?name=${name}&page=${page}&size=${size}`);
  }

}
