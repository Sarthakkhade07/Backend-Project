// we are writing this code if the error happens then error should br sen din the proper format 

class ApiError extends Error {
    constructor(
        statuscode,
        message ="Something went wrong",
        errors = [],
        statck =""
    ){
        super(message)
        this.statuscode = statuscode
        this.data =null
        this.message = message
        this.success = false
        this.errors = errors

        //extra info into the code
        if (statck) {
            this.stack =statck
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}