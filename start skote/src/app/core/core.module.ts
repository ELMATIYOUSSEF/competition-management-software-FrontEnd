import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }

export class PaginationModel {

  constructor( public pageNumber:number,
               public pageSize:number,
               public totalElements:number,
               public totalPages:number) {
  }
}
