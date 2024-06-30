import mongoose from "mongoose"

export async function dbConnect(url){
    mongoose.connect(url).then(()=>{
        console.log("Db connected succesfully");
    }).catch((error)=>{
        console.log("Error in database connection. Error: "+ error);
    })
}