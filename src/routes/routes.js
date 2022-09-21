import passport from "passport";
import authentication from "../middlewares/autentication.js";
import { 
    getHome,
    postLogin,
    getLogin,
    getFailLogin,
    getLogout,
    getFailSignup,
    postSignup,
    getSignup,
    failRoute,
    getInfo,
    getRandomApi,
} from "../controllers/controllers.js";
import { Router } from "express";

const router = Router();

//----------Home----------
router.get("/", authentication, getHome);

//----------Login----------
router.get("/login", getLogin);
router.post(
	"/login",
	passport.authenticate("login", { failureRedirect: "/faillogin" }),
	postLogin
);
router.get("/faillogin", getFailLogin);

//----------signup----------
router.get("/signup", getSignup);
router.post(
	"/signup",
	passport.authenticate("signup", { failureRedirect: "/failsignup" }),
	postSignup
);
router.get("/failsignup", getFailSignup);

//----------Redirect login and signup----------
router.post("/redirect-signup", (req, res) => res.redirect("/signup"));
router.post("/redirect-login", (req, res) => res.redirect("/login"));

//----------Logout----------
router.post("/logout", getLogout);

// ----------Info----------
router.get("/info", getInfo);

// ----------Api Random----------
router.get("/api/random", getRandomApi);

// ---------Fail route----------
router.get("*", failRoute);

export default router;