import mongoose from "mongoose";
/* import { pkg } from "log4js"; */
import pkg from 'log4js';
const { Log4js } = pkg;
/* import { getLogger } from "log4js"; */
/* import logger from "./middlewares/logger.js"; */
import dotenv from "dotenv";
dotenv.config();

/* mongoose.connect(process.env.MONGO_URI, (err) => {
    err
        ? logger.error(" Error al conectarse a MongoDB")
        : logger.info(" Conectados a MongoDB")
}) */

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`Mongo database connection sucesfull!!! ${conn.connection.host} `)
    } catch (error){
        err
        ? Log4js.error(" Error al conectarse a MongoDB")
        : Log4js.info(" Conectados a MongoDB")
    }
}

export default dbConnect;