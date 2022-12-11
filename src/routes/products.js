import { Router } from "express";
import ControllersProds from "../controllers/products.js";

const router = Router();

class RouterProds {
    constructor() {
        this.controllerProds = ControllersProds.getInstance();
    }

    start() {
        router.get("/", this.controllerProds.get);
        router.post("/add", this.controllerProds.addProduct);
        router.put("/update", this.controllerProds.update);
        router.delete("/remove", this.controllerProds.delete);

        return router;
    }
}
export default RouterProds;