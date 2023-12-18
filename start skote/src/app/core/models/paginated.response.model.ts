
export class PaginatedResponse <T> {
  data: T[]
  pageNumber:number
  pageSize:number
  totalElements:number
  totalPages:number
}
