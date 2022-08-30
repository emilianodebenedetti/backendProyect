const controller = {
	access: true,
	admin(req, res, next) {
		const { admin } = req.body;

		if (admin === controller.access) {
			// req.body.admin = "true";
			next();
		} else {
			// req.body.admin != "true";
			res.status(404).json({ error: "No autorizado" });
		}
	},
};

export default controller;
