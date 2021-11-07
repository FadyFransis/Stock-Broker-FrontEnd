export class Response<T>
{
    success: boolean;
    errors: any[];
    result:T;
    totalPages: number;
    totalItems: number;
    isSubmitted: boolean;
    isSubmittedSuccessfully:boolean;
    model : T;

    isError: boolean;
    description:string;
}