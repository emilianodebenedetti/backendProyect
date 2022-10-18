import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport"; 
import router from "./routes/routes.js"
import MongoStore from "connect-mongo";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ageCookie = (minutes) => {
	if (minutes === 1) {
		return 60000;
	} else {
		return minutes * 60000;
	}
};

/* app.use(cookieParser());
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: ageCookie(2),
			secure: false,
			httpOnly: false,
		},
	})
); */

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", ".pug");
app.set("views", "./src/views");

app.use(router);

app.use(session({
	store: MongoStore.create({ 
		mongoUrl: 'mongodb+srv://backend-db:123456@backend-db.mqhxe6l.mongodb.net/?retryWrites=true&w=majority',
	}),

	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 60000 
	}
}))

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




//  ------------ Servidor ---------------- 
/* const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, async () => {
	await mongoose.connect("mongodb+srv://backend-db:<password>@backend-db.mqhxe6l.mongodb.net/test")
	console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`)); */
