import {NgModule} from "@angular/core";
import {CompetitionListComponent, NgbdModalAddCompetition} from "./competition-list/competition-list.component";
import {RouterModule} from "@angular/router";
import {routes} from "./routes/competition.route";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from "src/app/shared/ui/ui.module";
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ CompetitionListComponent ,NgbdModalAddCompetition, DetailsComponent ],
  imports: [
    UIModule,
    FormsModule,
    CommonModule,
    NgbNavModule,
    RouterModule.forChild(routes)
  ]
})
export class CompetitionModule {}

export interface Competition {
  code?: string;
  date?: string; 
  startTime?: string;
  numberOfParticipants?: number;
  endTime?: string; 
  location?: string;
  amount?: number;
}

export class classCompetition implements Competition {
  constructor(
    code?: string,
    date?: string, 
    startTime?: string, 
    numberOfParticipants?: number,
    endTime?: string,
    location?: string,
    amount?: number
  ){}
}