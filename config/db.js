const mongoose = require("mongoose");
const env = require("./env.config");

const connect = async () => {
  try {
    const response = await mongoose.connect(env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000
    
  
    });

    console.log("server connected!");
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = connect;
