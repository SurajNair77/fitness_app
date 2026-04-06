export class ApiError extends Error{
    status: number
    constructor(message:string,status:number){
    super(message)
    this.status = status
}
}

export class ValidationError extends ApiError{
    constructor(message:string){
        super(message,400)
    }
}


