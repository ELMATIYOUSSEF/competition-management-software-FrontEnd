export interface ApiResponse<T> {
    status: string;
    message: string;
    data: { page: T };
}