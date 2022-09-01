import express from "express";
const app = express();

//  Firebase 

import admin from "firebase-admin";

import serviceAccount from 
"./DB/backend-19c96-firebase-adminsdk-55741-69ab33c77a.json" assert { type: "json" };
;
/* const admin = require(
	"firebase-admin",
	"assert {type:json}"
);
const serviceAccount = require(
	"./DB/backend-proyect-e58f8-firebase-adminsdk-fz6uf-a5856c7d21.json",
	"assert {type:json}"
) */

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://backend-19c96-default-rtdb.firebaseio.com"

});

//  Routes 

import routerProducts from "./routes/products.routes.js";
app.use("/api/productos", routerProducts);

import routerCart from "./routes/cart.routes.js";
app.use("/api/carrito", routerCart);

// Error 404 

function error404(req, res, next) {
	const message = {
		error: 404,
		descripcion: `ruta ${req.url} y metodo ${req.method} no estan implementados`,
	};
	if (req.url !== "/" || (req.url === "/" && req.method !== "GET")) {
		res.status(404).json(message);
	}
	next();
}

app.use(error404);

//  Servidor 

app.get("/", (req, res) => {
	res.send("<h1>Segunda entrega del proyecto</h1>");
});

//  Servidor 

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
