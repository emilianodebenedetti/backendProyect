import { Router } from "express";
import passport from "passport";
import ControllersPage from '../controllers/ControllersPage.js'
import authentication from "../middlewares/autentication.js";
import { logMethodsUrl, logUrlNoExists } from "../middlewares/logger.js";


const router = Router();

class PageRouter {
	constructor() {
		this.controllersPage = new ControllersPage();
	}

	start() {
		router.all("*", logMethodsUrl);
		
		//----------Home----------
		router.get("/", authentication, this.controllersPage.getHome);

		//----------Login----------
		router.get("/login", this.controllersPage.getLogin);
		router.post(
			"/login",
			passport.authenticate("login", { failureRedirect: "/faillogin" }),
			this.controllersPage.postLogin
			);
		router.get("/faillogin", this.controllersPage.getFailLogin);
		
		//----------signup----------
		router.get("/signup", this.controllersPage.getSignup);
		router.post(
			"/signup",
			passport.authenticate("signup", { failureRedirect: "/failsignup" }),
			this.controllersPage.postSignup
		);
		router.get("/failsignup", this.controllersPage.getFailSignup);
			
		//----------Redirigir al login y dignup----------
		router.post("/redirect-signup", (req, res) => res.redirect("/signup"));
		router.post("/redirect-login", (req, res) => res.redirect("/products"));

		//----------Logout----------
		router.post("/logout", this.controllersPage.getLogout);
		
		// ---------Fail route----------
		router.all("*", logUrlNoExists, this.controllersPage.failRoute);

		return router;
	}
}

export default PageRouter;
/* let PageRouter = class PageRouter {
	nombrada
} */

/* let PageRouter = class {
	anonima
} */
