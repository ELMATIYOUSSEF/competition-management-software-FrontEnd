import {NgModule} from "@angular/core";
import { MemberComponent ,NgbdModalContent} from "./member.component";
import {RouterModule} from "@angular/router";
import {routes} from "./routes/member.route";
import {SharedModule} from "../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MemberComponent,NgbdModalContent],
  imports: [
    SharedModule,
    FormsModule,
    CommonModule, 
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe, NgbModal,NgbActiveModal , MemberComponent]
})
export class MemberModule {}

export interface Member {
  id?: number;
  name?: string;
  familyName?: string;
  accessionDate?: any;
  nationality?: string;
  identityDocumentType?: string;
  identityNumber?: string;
}

export class classMember implements Member {
  constructor(
    id?: number,
    name?: string,
    familyName?: string,
    accessionDate?: any,
    nationality?: string,
    identityDocumentType?: string,
    identityNumber?: string,
  ){}
}
