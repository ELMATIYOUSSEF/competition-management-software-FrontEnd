import {Routes} from "@angular/router";
import {CompetitionListComponent} from "../competition-list/competition-list.component";
import { DetailsComponent } from "../details/details.component";


export const routes: Routes = [
  { path: "", component: CompetitionListComponent},
  { path: "details", component: DetailsComponent}
]
