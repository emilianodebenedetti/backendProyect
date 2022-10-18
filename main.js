import app from "./src/server.js";
import * as dotenv from "dotenv";
import yargs from "yargs";
import os from "os";
import cluster from "cluster";
import dbConnect from "./src/config/db.js";
import mongoose from "mongoose";
const numCPUs = os.cpus() .length;
//----------dotenv----------
dotenv.config();

const args = yargs(process.argv.slice(2)).options({
	p: {
		alias: "port",
		default: "8080",
		describe: "Puerto del servidor",
	},
	m: {
		alias: "mode",
		default: "FORK",
		describe: "Modo del servidor",
		type: "string"
	},
}).parse();

const portArgs = args.port || 8080;
const PORT = process.env.PORT || portArgs;
const serverMode = args.mode || "FORK";
const MONGO_CONNECT = 'mongodb+srv://backend-db:123456@backend-db.mqhxe6l.mongodb.net/?retryWrites=true&w=majority';

if (serverMode == "CLUSTER") {
  if(cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} finalizado`);
    });
  } else {
    const server = app.listen(PORT, async () => {
      await mongoose.connect(process.env.MONGO_CONNECT);
      console.log(
        `Servidor HTTP escuchando en puerto ${server.address().port}`
      );
    });

    server.on("error", (error) => console.log(`Error en servidor: ${error}`));
    console.log(`Worker ${process.pid} started`);
  }
} else {
    const server = app.listen(PORT, async () => {
      await mongoose.connect(process.env.MONGO_URI);
      console.log(
        `Servidor HTTP escuchando en puerto ${server.address().port}`
        );
    });

    server.on("error", (error) => console.log(`Error en servidor: ${error}`))
}

/* const server = app.listen(PORT, () => {
    const MONGO_CONNECT = "mongodb+srv:backend-db:123456@backend-db.mqhxe6l.mongodb.net/?retryWrites=true&w=majority"; 
    mongoose.connect(process.env.MONGO_CONNECT);
    console.log(
      `Servidor HTTP escuchando en el puerto ${server.address().port}`
    );
  }); */
  
/* mongoose.connect(

    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log(`Connected to MongoDB ${MONGO_URL}`);
    }
  );
 */
  
/* 
const server = app.listen(PORT, () => {
	console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`)); */




/* Server con pid */
/* const PORT = parseInt(process.argv[2]) || 8080
   
app.get('/', (req,res) => {
    console.log(`port: ${PORT} -> fyh: ${Date.now()}`)
    res.send(`Servidor express en puerto ${PORT} `)
})
app.listen(PORT, err => {
    if(!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER${process.pid}`)
}) */