const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then( () => console.log("DB connected Successfully"))
    .catch( (error) => {
        console.log("DB connection Failed");
        console.error(error);
        process.exit(1);
    })
};



// const mongoose = require("mongoose");
// require("dotenv").config();

// exports.connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log(" Database Connected Successfully");
//   } catch (error) {
//     console.error("Database Connection Failed:", error.message);
//     process.exit(1);
//   }
// };
