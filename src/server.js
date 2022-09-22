import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport"; 
import session from "express-session";
import router from "./routes/routes.js"

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus() .length;

/*import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import LocalStrategy  from "passport-local";
import * as dotenv from "dotenv"; 
dotenv.config();
import MongoStore from "connect-mongo";*/

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const cookieAge = (mins) => {
	if (mins === 1) {
		return 60000;
	} else {
		return mins * 60000;
	}
};

app.use(cookieParser());
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: cookieAge(2),
			secure: false,
			httpOnly: false,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", ".pug");
app.set("views", "./src/views");
app.use(router);


export default app
// Error 404 
/* function error404(req, res, next) {
	const message = {
		error: 404,
		descripcion: `ruta ${req.url} y metodo ${req.method} no estan implementados`,
	};
	if (req.url !== "/" || (req.url === "/" && req.method !== "GET")) {
		res.status(404).json(message);
	}
	next();
}
app.use(error404); */


/* mongoose
 */
/* Sessions */
/* app.use(session({
	store: MongoStore.create({ 
		mongoUrl: 'mongodb+srv://localhost/',
		mongoOptions: advancedOptions 
	}),

	secret: 'secreto',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60000 
	}
})) */



//  ------------ Servidor ---------------- 
/* const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, async () => {
	await mongoose.connect("mongodb+srv://backend-db:<password>@backend-db.mqhxe6l.mongodb.net/test")
	console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`)); */
