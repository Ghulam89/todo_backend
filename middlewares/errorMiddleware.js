const errorMiddleware = (err,req,res,next)=>{
    console.log(err);
    res.status(500).send({
        success:false,
        message:"Something Went Wrong",
        err,
    });

    let error = { ...err };

    error.message = err.message;
  
    if (err.name === "CastError") {
      const message = `Resource not found, Invalid: ${err.path}`;
      error = new Error(message);
    }
  
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
  
      error = new Error(message);
    }
  
    if (err.name === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
  
      error = new Error(message);
    }
  
    res.json({
      success: false,
      message: error.message,
    });




}

module.exports =  errorMiddleware;