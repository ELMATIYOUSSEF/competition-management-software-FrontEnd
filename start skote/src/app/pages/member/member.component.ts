import { Component, OnInit ,inject ,Input, Output, EventEmitter } from '@angular/core';
import { MemberService } from './service/service.service';
import { Member, classMember } from './member.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModel } from 'src/app/core/core.module'; 
import { DatePipe } from '@angular/common';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  members: Member[] = [];
  query:any;
  num :any;
  pagination: PaginationModel = new PaginationModel(0, 10, 0, 0);
  
  constructor(private memberService: MemberService ,private datePipe :DatePipe,
    private modalService: NgbModal , ) { }

  ngOnInit(): void {
  this.Onlouding( 0,2);
  }


  public Onlouding(page: number,size: number) {
    this.memberService.findAllMember(page,size).subscribe({
      next: (res) => {
        console.log(res.data['member']);
        this.members = res.data['member'].map((member: Member) => {
          return {
            ...member,
            //yyyy-MM-dd HH:mm:ss
            accessionDate: this.datePipe.transform(member.accessionDate, 'yyyy-MM-dd')
          };
        });
        console.log(res.data['totalElements']);
        this.pagination.pageSize = res.data['pageSize'];
        this.pagination.pageNumber = res.data['pageNumber'];
        this.pagination.totalElements = res.data['totalElements'];
        this.pagination.totalPages = res.data['totalPages'];
      },
      error: err => {
        console.error(err);
      }
    })
  }

  sendQuery(query: string, page: number, size: number) {
    this.memberService.searchMember(query, page, size).subscribe(
      (response) => {
        console.log(response); 
        this.members = response.data.content;
        this.pagination.pageSize = response.data.content['pageSize'];
        this.pagination.pageNumber = response.data.content['pageNumber'];
        this.pagination.totalElements =response.data.content['totalElements'];
        this.pagination.totalPages = response.data.content['totalPages'];
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  loadDataByPage(pageNumber: number): void {
    this.Onlouding(pageNumber,2);
  }
  generatePageNumbers(): number[] {
    return Array.from({ length: this.pagination.totalPages }, (_, index) => index + 1);
  }

  Search(){
    console.log(this.query);
    this.sendQuery(this.query,0,10);
  }

  public open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.ModalTitel = "Add Member";

    modalRef.componentInstance.memberSaved.subscribe((newMember: Member) => {
      this.members.push(newMember);
    });
  }

  alert(id: number) {
    let member = this.findMemberById(id);
    Swal.fire({
      title: 'Enable members',
      text: `Do you want to enabled Member : ${member.name} ${member.familyName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes'
    }).then(result => {
      if (result.value) {
        this.enableMember(member);
      }
    });
  }

  enableMember(member: Member) {
    this.memberService.enableMember(member.id).subscribe(
      () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Member has been enabled with successfully`,
          showConfirmButton: false,
          timer: 1500
        });        
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while enabling/disabling member!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    );

  }
  findMemberById(id: number) {
    return this.members.find(member => member.id === id);
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
      this.memberComponent.members.push(member);
      this.memberSaved.emit(member);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Member has been saved successfully',
        showConfirmButton: false,
        timer: 1500
      });
  } else {
    Swal.fire(" Response data is undefined.")
  }
    this.activeModal.close();
  },(error: any) => { Swal.fire(error.error.Error)}) 
  }
}
