import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import passport from "passport";
import bCrypt from 'first'

const LocalStrategy = require('passport-local').Strategy; 

/* mongo Atlas */
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}

/* Estrategias de autenticación con redes sociales */
import { Jwt } from "jsonwebtoken";
const PRIVATE_KEY = "myprivatekey";

function generateToken(user) {
	const token = jwt.sign({ data: user}, PRIVATE_KEY, { expiresIn: '12h'});
	return token;
}



//----------------------------------------------------------------
const app = express();

app.use(express.json())
app.use(express.urlencoded())

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
/*------------------- LocalStrategy --------------------------*/
passport.use('/login', new LocalStrategy (
	(username, password, done) => {
		User.findOne({ username }, (err, user) => {
			if (err) 
				return done(err);
			
			if(!user){
				console.log(`User not found with username ${username}`)
				return
			}
			if(!isValidPassword(user, password) ) {
				console.log('Invalid password')                   
				return done(null, false)
			}
			
			return done(null, user);
		});
						
	})
)
passport.use('/signup', new LocalStrategy ({
	passReqToCallback: true
},
	(req, username, password, done) => {
		User.findOne({ 'username' : username }, function
		(err, user) {
			
			if (err) {
				console.log(`Error in signup: ${err}`);
				return done (err);
			}
			
			if (user) {
				console.log('User already exists');
				return done (null, false);
			}
			
			const newUser = {
				username: username,
				password: createHash(password),
				email: req.body.email,
				firstName: req.body.firstName,
				lastName: req.body.lastName
			}

			User.create(newUser, (err, userWithId) => {
				if (err) {
					console.log(`Error al guardar usuario ${err}`);
					return done(err);
				}
				console.log(user)
				console.log('Registro completo exitosamente!')
				return done (null, userWithId)
			});
		});
		
	})
)

function createHash(password) {//Crea un hash(contraseña) para no tener la contraseña directamente guardada en la db
	return bCrypt.hashSync(
		password,
		bCrypt.genSaltSync(10),
		null);
}
//---------Serializar y deserializar-----------
/* passport.serializeUser((user, done) => {
	done (null, user._id);
});
passport.deserializeUser((id, done) => {
	User.findById(id, done);
}) */

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

//Register
app.post('/register', (req, res) => {

	const { nombre, password, dirección } = req.body

	const yaExiste = usuarios.find( usuario => usuario.nombre == nombre) 

	if (yaExiste) {
		return res.json({ error : 'Usuario existente, prueba con otro' });

	}
	const usuario = { nombre, password, dirección }

	usuarios.push(usuario)

	const access_token = generateToken(usuario)

	res.json({ access_token })
})

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
	saveUninitialized: false,
	cookie: {
		maxAge: 60000 /* desp de 1 min se elimina la session */
	}
}))

/* --------------Login por form----------------- */
app.get('/', (req, res) =>{
	res.send('Servidor express ok!')
})
app.post('/login', (req, res) =>{
	let { nombre } = req.body;
		req.session.nombre = nombre;
		/* res.redirect() */
		res.send(`Usuario guardado en session: ${req.session.nombre}`)
})
app.get('/main', (req, res) =>{
	if(req.session.nombre) {
		res.send('Bienvenidos a nuestro main!')
	} else {
		res.send('No estás logeado, vamos a registrarte!')
		res.redirect('/login')
	}
})
app.get('/logout', (req, res) =>{
	err.session.destroy(err => {
		if (!err) res.send('Logout ok!')
		else res.send({ status: 'Logout ERROR', body: err })
	})
})

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

/* app.get("/", (req, res) => {
	res.send("<h1>Segunda entrega del proyecto</h1>");
}); */

//  Servidor 

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, async () => {
	await mongoose.connect("mongodb+srv://backend-db:<password>@backend-db.mqhxe6l.mongodb.net/test")
	console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
