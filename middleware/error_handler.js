const {constants} = require("../constants");

const errorHandler = (err,req,res,next) => {
    const status = res.status ? res.status : 500;
    switch(res.status){
        case constants.VALIDATION_ERROR:
    res.json({title:"Validation Failed",
         message : err.message,
          stacktrace : err.stacktrace});  
        case constants.NOT_FOUND:
            res.json({title:"Not Found",
            message : err.message,
             stacktrace : err.stacktrace});
        case constants.FORBIDDEN:
                res.json({title:"Forbidden",
                message : err.message,
                 stacktrace : err.stacktrace});  
        case constants.UNAUTHORIZED:
                    res.json({title:"Unauthorized",
                    message : err.message,
                     stacktrace : err.stacktrace});
        default: console.log("No Error , all good");

            break;       
    }
    next();
};

module.exports = errorHandler;