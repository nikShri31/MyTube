// nodejs api errors

class ApiError extends Error{
 constructor(
   statusCode,
   message='Something went Wrong!!',
   errors=[],
   stack="",
 ){
    super(message)
        this.statusCode = statusCode
        this.data = null                 // what is this.data and what includes in it ?
        this.message = message
        this.success = false;
        this.errors = errors

        if(stack){
            this.stack= stack
        }else{
            Error.captureStackTrace(this, this.constructor)       // Read documentation
        }
 }   
}
export {ApiError}