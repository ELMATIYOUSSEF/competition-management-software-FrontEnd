import {NgModule} from "@angular/core";
import {CompetitionListComponent, NgbdModalAddCompetition} from "./competition-list/competition-list.component";
import {RouterModule} from "@angular/router";
import {routes} from "./routes/competition.route";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbNavModule,NgbAlertModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from "src/app/shared/ui/ui.module";
import { DetailsComponent } from './details/details.component';
import { ArchwizardModule } from 'angular-archwizard';
import { ModalsComponent } from './modals/modals.component';
import { CountdownComponentComponent } from './countdown-component/countdown-component.component';
import { PodiumComponentComponent } from "./podium-component/podium-component.component";

@NgModule({
  declarations: [ 
    CompetitionListComponent,
    NgbdModalAddCompetition,
    DetailsComponent,
    ModalsComponent,
    CountdownComponentComponent,
    PodiumComponentComponent
   ],
  imports: [
    ArchwizardModule,
    UIModule,
    FormsModule,
    NgbAlertModule,
    CommonModule,
    NgbNavModule,
    RouterModule.forChild(routes)
  ]
})
export class CompetitionModule {}

export interface ApiResponseRanking {
  data: Ranking[];
}

export interface Competition {
  code?: string;
  date?: Date; 
  startTime?: string;
  numberOfParticipants?: number;
  endTime?: string; 
  location?: string;
  amount?: number;
  ranks?: ApiResponseRanking;
  hunting?:any;
}

export class classCompetition implements Competition {
  constructor(
    code?: string,
    date?: string, 
    startTime?: string, 
    numberOfParticipants?: number,
    endTime?: string,
    location?: string,
    amount?: number,
    ranks?: ApiResponseRanking,
    hunting?:any[],
  ){}
}

//
interface Level {
  code: number;
  description: string;
  point: number;
}

export interface Fish {
     name: string;
      averageWeight: number;
      level: Level;
}

interface Hunting {
  id: number;
  numberOfFish: number;
  fish: Fish;
}

interface Member {
  id: number;
  name: string;
  familyName: string;
  accessionDate: string;
  nationality: string;
  identityDocumentType: string;
  identityNumber: string;
  huntings: Hunting[];
}

interface RankingId {
  memberId: number;
  competitionCode: string;
}

interface Ranking {
  id: RankingId;
  ranks: number;
  score: number;
  member: Member;
}


export class RequestHuntingVM {
  code_Competition: string;
  id_User: number;
  name_Fish: string;
  poids_Fish: number;

  constructor(
    code_Competition: string,
    id_User: number,
    name_Fish: string,
    poids_Fish: number
  ) {
    this.code_Competition = code_Competition;
    this.id_User = id_User;
    this.name_Fish = name_Fish;
    this.poids_Fish = poids_Fish;
  }
}

