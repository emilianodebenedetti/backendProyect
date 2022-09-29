import mongoose from "mongoose";
import yargs from "yargs";
import app from "./src/server.js";
import express from "express";

//----------dotenv----------
import * as dotenv from "dotenv";
dotenv.config();


/* const args = yargs(process.argv.slice(2))
        .alias("p", "port")
        .describe("P", "Puerto del servidor")
        .help("h")
        .alias("h", "help")
        .argv;

const argsPort = args.port || 8080;
const PORT = process.env.PORT || argsPort;

const server = app.listen(PORT, async () => {
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`)); */

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log('Connected to MongoDB');
    }
  );

  
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));




/* Server con pid */
/* const PORT = parseInt(process.argv[2]) || 8080
   
app.get('/', (req,res) => {
    console.log(`port: ${PORT} -> fyh: ${Date.now()}`)
    res.send(`Servidor express en puerto ${PORT} `)
})
app.listen(PORT, err => {
    if(!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER${process.pid}`)
}) */