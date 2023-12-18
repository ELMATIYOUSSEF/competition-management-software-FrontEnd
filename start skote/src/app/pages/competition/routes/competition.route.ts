import {Routes} from "@angular/router";
import {CompetitionListComponent} from "../competition-list/competition-list.component";
import { DetailsComponent } from "../details/details.component";
import { PodiumComponentComponent } from "../podium-component/podium-component.component";


export const routes: Routes = [
  { path: "", component: CompetitionListComponent},
  { path: "details/:code", component: DetailsComponent},
  { path: ":code/poduim", component: PodiumComponentComponent},
]
