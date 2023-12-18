import { Component, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';
import {CompetitionService} from "../service/service.service";
import { NgbActiveModal, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Competition, classCompetition } from '../competition.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competition',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss']
})
export class CompetitionListComponent implements OnInit {
  breadCrumbItems: Array<{}> =  [{ label: 'Competition' }, { label: 'List', active: true }];;
  competitions: Competition[] = [];
  Status : string ;
  constructor(private competitionService: CompetitionService ,
    private modalService: NgbModal  ) { }
  ngOnInit() {
    this.Onlouding()
    }
    public Onlouding() {
      this.competitionService.findAllCompetition().subscribe({
        next: (res) => {
          console.log();
          this.competitions = res
        },
        error: err => {
          console.error(err);
        }
      })
    }
    public open() {
      const modalRef = this.modalService.open(NgbdModalAddCompetition);
      modalRef.componentInstance.ModalTitel = "Add Competition";
      modalRef.componentInstance.CompSaved.subscribe((newMember: Competition) => {
        this.competitions.push(newMember);
      });
    }
    getStatusClass(date: string): string {
      const currentDate = new Date();
      const competitionDate = new Date(date);
  
      if (currentDate < competitionDate) {
        this.Status ="Pending";
        return 'btn-success'; 
      } else if (currentDate > competitionDate) {
        this.Status ="Completed";
        return 'btn-danger'; 
      } else {
        this.Status ="in progress";
        return 'btn-warning'; 
      }
    }

}

@Component({
	selector: 'ngbd-modal-Competionadding',
	template: `

		<div class="modal-header">

			<h4 class="modal-title">{{ModalTitel}}</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
    <form action="" (submit)="onSubmit()">
		<div class="modal-body">
                <div class="mb-3">
                  <label for="recipient-accession" class="col-form-label"> Start Date :</label>
                  <input type="Time" class="form-control" name="accessionDate" id="recipient-accessionDate" [(ngModel)] = "saveCompetition.startTime">
                </div>
                <div class="mb-3">
                  <label for="recipient-family" class="col-form-label">Date de Competition :</label>
                  <input type="Date" class="form-control" name="familyName" id="recipient-family" [(ngModel)] = "saveCompetition.date">
                </div>
                <div class="mb-3">
                  <label for="recipient-nationality" class="col-form-label">End Time :</label>
                  <input type="Time" class="form-control" name="nationality" id="recipient-nationality" [(ngModel)] = "saveCompetition.endTime">
                </div>
                <div class="mb-3">
                  <label for="recipient-identityNumber" class="col-form-label">Location :</label>
                  <input type="text" class="form-control" name="identityNumber" id="recipient-identityNumber" [(ngModel)] = "saveCompetition.location">
              </div>
              <div class="mb-3">
                  <label for="recipient-identityNumber" class="col-form-label">Amount :</label>
                  <input type="text" class="form-control" name="identityNumber" id="recipient-identityNumber" [(ngModel)] = "saveCompetition.amount">
              </div>
        </div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
       <button type="submit" class="btn btn-outline-dark" >Save Competition</button>
    </div>

    </form>
	`,
})
export class NgbdModalAddCompetition  implements OnInit {
  saveCompetition: Competition = new classCompetition();

  constructor(public activeModal : NgbActiveModal, private competitionService: CompetitionService){}
	@Input() items?: any;
	@Input() ModalTitel?: any;
  @Output()CompSaved = new EventEmitter<Competition>();
  ngOnInit(): void {

  }
  onSubmit(){
    console.log(this.saveCompetition);
  this.competitionService.createCompetition(this.saveCompetition).subscribe((competition)=> {
    if (competition) {
      console.log(competition.data+" created");
      this.CompSaved.emit(competition.data);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Competition has been saved successfully',
        showConfirmButton: false,
        timer: 1500
      });
  } else {
    console.error("Error: Response data is undefined.");
  }
    this.activeModal.close();

  },
  (error: any) => { Swal.fire(error.error.Error)})
  }
}

