import express from "express";
/* Cookie */
import cookieParser from "cookie-parser";
/* Sessions */
import session from "express-session";
/* -----Persistencia por mongoDB----- */
import MongoStore from "connect-mongo";
/* mongo Atlas */
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}

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

// <--------------- Cookies -------------------->

/* app.use(cookieParser()) */
/* app.use(cookieParser('my-secret')) */ // secret 
/* app.use(cookieParser(['my-secret', 'another-secret'])) */ // secret con array

/* --------------------desafio clase -------------------------*/
app.use(cookieParser('desafioClase'))
app.use(express.json())
 
app.post('/cookies'), (req, res) => {
	const { nombre, valor, tiempo } = req.body
	console.log(nombre, valor, tiempo)
	
	//param recibido invalido
	if (!nombre || !valor) {
		return res.json({ error: 'falta nombre o valor1'})
	}
	
	//si no hay tiempo, generar cookie sin expiracuión
	if (tiempo) {
		res.cookie(nombre, valor, { signed: true, maxAge: 1000 * parseInt(tiempo) })
	} else { 
		res.cookie(nombre, valor, { signed: true })
	}
	//si sale bien:
	res.json({ proceso: 'ok'})
}

app.get('/cookies', (req, res) => {
	console.log(req.cookies)
	res.json({ normales: req.cookies, firmadas: req.signedCookies })
})

app.delete('/cookies/:nombre', (req, res) => {
	const { nombre } = req.params
	console.log(req.cookies[nombre])
	console.log(req.signedCookies[nombre])
	if (!req.cookies[nombre] && !req.signedCookies[nombre]) {
		res.json({ erroe: 'nombre de cookie invalido' })
	} else {
		res.clearCookie(nombre)
		res.json({ proceso: 'ok' })
	}
})
 //obtener cookie con cierto nombre
app.get('/cookies/:nombre', (req, res) => {
	const { nombre } = req.params
	let name = req.cookies[nombre];
	console.log(name)
	res.json({ proceso: name })
});
/* -----------------fin ej clase -------------- */

/* Sessions */
app.use(session({
	/* Persistencia por mongoDB */
	store: MongoStore.create({ 
		mongoUrl: 'mongodb+srv://localhost/',
		mongoOptions: advancedOptions 
	}),

	secret: 'secreto',
	resave: false,
	saveUninitialized: false/* ,
	cookie: {
		maxAge: 10000
	} */
}))
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
