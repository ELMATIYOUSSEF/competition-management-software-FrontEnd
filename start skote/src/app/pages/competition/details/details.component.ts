import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompetitionService } from '../service/service.service';
import { ActivatedRoute } from '@angular/router';
import { Competition , RequestHuntingVM } from '../competition.module';
import { MemberService } from '../../member/service/service.service';
import { Member } from '../../member/member.module';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit { 
   constructor(
    private modalService: NgbModal,
    private competitionService: CompetitionService,
    private route: ActivatedRoute,
    public memberService: MemberService) { }

  
  breadCrumbItems: Array<{}> = [{ label: 'Competition' }, { label: 'Details', active: true }];
  date: any;
  competitionCode: string;
  parametre : string;
  competition: Competition;
  Fishs : any ;
  table: [];
  member: Member[] = [];
  competitions = [];
  members =[];
  RegisterMember : number ;
  distance : any ;

  Ranking: any[];
  selectedmember: any;
  selectedfish: any;
  selectedPoids: any;
 

  ngOnInit(): void {
    this.getallcompetition();
    this.getallmembers();
    this.route.params.subscribe(params => {
      this.competitionCode = params['code'];
      console.log(this.competitionCode);
      forkJoin([
       this.getCompetitionsAsync(this.competitionCode)
      ]).subscribe(() => {
        console.log(this.competition?.date )
        this.date =new Date(this.competition?.date)
        this.distance = this.date.getTime() - new Date().getTime();
        console.log(this.distance +' distance');
      }, (err) => {Swal.fire(err.error.message)} );      
    });
   
    this.getFishing();
  }
  /*
  getRankings(code: string): Observable<any> {
    return this.competitionService.findRankingByMemberAndCompetition(code).pipe(
      map(rank => {
        this.Ranking.push(rank.data);
        console.log(rank.data);
        return rank.data;
      }),
      catchError(error => {
        console.error("Error fetching rankings:", error);
        return throwError(error);
      })
    );
  }
  /*
  async getCompetitionsAsync(CompetitionId: string) {
    try {
      const comp = await this.competitionService.getCompetition(CompetitionId).toPromise();
      this.competition = comp[0];
      console.log(comp[0]);
    } catch (error) {
      console.error("Error fetching competition:", error);
    }
  }
  */
  async getCompetitionsAsync(CompetitionId: string): Promise<Competition> {
    try {
      const comp = await this.competitionService.getCompetition(CompetitionId).toPromise();
      this.competition = comp;
      console.log(comp);
      return comp; 
    } catch (error) {
      Swal.fire(error.error.message);
    }
  }

  getfishPoids(){
    const requestHuntingVM: RequestHuntingVM = {
      code_Competition: this.competitionCode,
      id_User:this.selectedmember,
      name_Fish: this.selectedfish,
      poids_Fish:this.selectedPoids
    };
    this.competitionService.addHunting(requestHuntingVM).subscribe(
      response => {
        console.log('Successfully added hunting:', response);
      },
      error => {
       Swal.fire(error.error.message);
      });
    console.log(this.selectedmember);
    console.log(this.selectedfish);
    console.log(this.selectedPoids);
  }
  getFishing(){
    this.competitionService.getAllFishs().subscribe((fish) => { 
      this.Fishs = fish;
      console.log(fish + "fishssssss");
     },err => {Swal.fire(err.error.message);});
  }
  getallcompetition(){
    this.competitionService.findAllCompetition().subscribe((competition) => { this.competitions = competition} ,err => {Swal.fire(err.error.message);});
  }

  openModal(content: any, code: any, memberid: number): void {
  //  this.competitionService.registerInCompetition(code, memberid).subscribe()
    this.modalService.open(content, { centered: true });
  }
  getallmembers(){
    this.memberService.findAllMember(0,50).subscribe({
      next: (res) => {
        this.members = res['data']['member'];
      },
      error: err => {
        Swal.fire(err.error.message);
      }
    }) 
  }

  regiter(){
    this.competitionService.registerInCompetition(this.competitionCode,this.RegisterMember).subscribe( err => {Swal.fire(err.error.message); console.error(err)});
    Swal.fire('Done!', 'Member Registred!', 'success');
    this.modalService.dismissAll();
  }
}
