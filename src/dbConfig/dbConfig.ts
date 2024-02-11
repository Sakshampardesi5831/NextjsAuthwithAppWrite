import mongoose from "mongoose";


export async function connect()  {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection;
        connection.on("connected", () => {
           console.log("MongoDB is connected");
        })
        connection.on("error", (err) => {
            console.log(`${err}`)
            process.exit();
        })
    } catch (error) {
        console.log("SomeThing Goes Wrong !!!");
        console.log(error);
    }
}