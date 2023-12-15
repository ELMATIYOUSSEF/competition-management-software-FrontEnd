import { Component, OnInit ,inject ,Input, Output, EventEmitter } from '@angular/core';
import { MemberService } from './service/service.service';
import { Member, classMember } from './member.module';
import { map, startWith, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api.response';
import { Page } from 'src/app/core/models/paginated.response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationModel } from 'src/app/core/core.module'; 
import { DatePipe } from '@angular/common';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  usersState$: Observable<{ appState: string, appData?: ApiResponse<Page<any>>, error?: HttpErrorResponse }>;
  members: Member[] = [];
  pagination: PaginationModel = new PaginationModel(0, 10, 0, 0);

  constructor(private memberService: MemberService ,private datePipe :DatePipe,
    private modalService: NgbModal) { }

  ngOnInit(): void {
   //this.loadingService.loadingOn();
  this.Onlouding(0,10);
  }
  public Onlouding(page: number,size: number) {
    this.memberService.findAllMember(page,size).subscribe({
      next: (res) => {
        console.log(res['data']['member']);
        this.members = res['data']['member'].map((member: Member) => {
          return {
            ...member,
            //yyyy-MM-dd HH:mm:ss
            accessionDate: this.datePipe.transform(member.accessionDate, 'yyyy-MM-dd')
          };
        });

        this.pagination.pageSize = res['data']['pageSize'];
        this.pagination.pageNumber = res['data']['pageNumber'];
        this.pagination.totalElements = res['data']['totalElements'];
        this.pagination.totalPages = res['data']['totalPages'];
      },
      error: err => {
        console.error(err);
      }
    })
  }

  public open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.ModalTitel = "Add Member";

    modalRef.componentInstance.memberSaved.subscribe((newMember: Member) => {
      this.members.push(newMember);
    });
  }


}
@Component({
	selector: 'ngbd-modal-content',
	template: `

		<div class="modal-header">

			<h4 class="modal-title">{{ModalTitel}}</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
    <form action="" (submit)="onSubmit()">
		<div class="modal-body">
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">First name :</label>
                  <input type="text" class="form-control" name="name" id="recipient-name"  [(ngModel)] = "saveMember.name">
                </div>
                <div class="mb-3">
                  <label for="recipient-family" class="col-form-label">Family Name :</label>
                  <input type="text" class="form-control" name="familyName" id="recipient-family" [(ngModel)] = "saveMember.familyName">
                </div>
                <div class="mb-3">
                  <label for="recipient-accession" class="col-form-label"> AccessionDate :</label>
                  <input type="date" class="form-control" name="accessionDate" id="recipient-accessionDate" [(ngModel)] = "saveMember.accessionDate">
                </div>
                <div class="mb-3">
                  <label for="recipient-nationality" class="col-form-label">Nationality :</label>
                  <input type="text" class="form-control" name="nationality" id="recipient-nationality" [(ngModel)] = "saveMember.nationality">
                </div>
                <div class="mb-3">
                  <label for="recipient-identityNumber" class="col-form-label">Identity Number :</label>
                  <input type="text" class="form-control" name="identityNumber" id="recipient-identityNumber" [(ngModel)] = "saveMember.identityNumber">
              </div>
              <div class="mb-3">
              <label for="recipient-identityDocumentType" class="col-form-label">Identity Document Type  :</label>
              <select class="form-select" name="identityDocumentType"  aria-label="Default select example" [(ngModel)] = "saveMember.identityDocumentType">
                <option disabled selected>select Identity Document Type</option>
                <option value="CIN">CIN</option>
                <option value="PASSPORT">PASSPORT</option>
                <option value="RESIDENCE_CARD">RESIDENCE CARD</option>
              </select>
              </div>
        </div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
       <button type="submit" class="btn btn-outline-dark" >Save Member</button>
    </div>

    </form>
	`,
})
export class NgbdModalContent implements OnInit {
  saveMember: Member = new classMember();

  constructor(public activeModal : NgbActiveModal, private memberService: MemberService , public memberComponent : MemberComponent){
  }
	@Input() items?: any;
	@Input() ModalTitel?: any;
  @Output() memberSaved = new EventEmitter<Member>();
  ngOnInit(): void {

  }
  onSubmit(){
    console.log(this.saveMember);
  this.memberService.createMember(this.saveMember).subscribe((member)=> {
    if (member) {
     // this.memberComponent.Onlouding(0,10);
      this.memberComponent.members.push(member);
      this.memberSaved.emit(member);
  } else {
    console.error("Error: Response data is undefined.");
  }
    this.activeModal.close();
  })
  }
}
