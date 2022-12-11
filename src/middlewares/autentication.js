import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/Usuario.js";


const isValidPsw = (user, password) =>
	bcrypt.compareSync(password, user.password);
	
const createHash = (password) =>
	bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

passport.use(
	"login",
	new LocalStrategy((username, password, done) => {
		User.findOne({ username }, (error, user) => {
			if (error) return done(error);
			if (!user)
				return done(null, false, {
					message: "Usuario y contraseña no coinciden, intenta de nuevo",
				});
			if (!isValidPsw(user, password))
				return done(null, false, {
					message: "Usuario y contraseña no coinciden, intenta de nuevo",
				});
			return done(null, user);
		});
	})
);

passport.use(
	"signup",
	new LocalStrategy(
		{
			passReqToCallback: true,
		},
		(req, username, password, done) => {
			User.findOne({ username: username }, (error, user) => {
				if (error)
					return done(error, user, {
						message: "Error durante el registro, revisa tus datos.",
					});
				if (user) return done(null, false, { message: "Usuario existente" });
				const newUser = { username, password: createHash(password) };
				User.create(newUser, (error, userWithId) => {
					if (error) {
						return done(error, user, { message: "Error al crear usuario" });
					} else {
						return done(null, userWithId, { message: "Usuario registrado" });
					}
				});
			});
		}
	)
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, done));

const authentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/login");
	} 
};
export default authentication;