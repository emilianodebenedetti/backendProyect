import { fork } from "child_process";
import authentication from "../../middlewares/autentication";

export const getHome = (req, res) => {
	res.render("home", { name: req.session.name });
}

//---------- Login ----------
export const login = (req, res) => {
	if (req.authentication) {
		
	}
}
//---------- Login ----------
//---------- Login ----------
//---------- Login ----------
//---------- Login ----------
//---------- Login ----------

export default controller;
