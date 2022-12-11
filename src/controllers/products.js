import ProductsDAO from "../DAO/products.js";
import Product from "../models/Products.js";
import ProductsAPI from "../services/productApi.js";
import { logApp } from "../utils/apiLogs.js";

/* const productsAPI = new ProductsAPI(); */

class ControllersProds {

    constructor(){
        this.api = ProductsAPI.getInstance();
        this.instance = null;
    }

    static getInstance = () => {
        if (!this.instance) this.instance = new ControllersProds();
        return this.instance;
    }

    getAll = async () => {
        try {
            const res = await this.api.getAll();
            return res;
        } catch (error) {
            logApp.info("Error", error);
        }
    };

    get = async (req, res) => {
        try {
            const { id } = req.query;
            if (!id) {
                res.json(await this.getAll());
            } else {
                const response = await this.api.get(Number(id));
                res.json({ response });
            }
        } catch (error) {
            logApp.info("Error", error);
        }
    };

    addProduct = async (req, res) => {
        try {
            const product = req.body;
            if (!product) res.json({ message: "Producto no añadido" }).status(4000);
        
            const response = await this.api.addProduct(ProductsDAO);
            res.json({ response }).status(200);
        } catch {
            logApp.info("Error", error);
        }
    };

    update = async (req, res) => {
        try {
            const { id } = req.query;
            const product = req.body;
            if (!product || !id) {
                res.json({ message: "Producto o id no especificados" });
            }
            const response = await this.api.update(Number(id), product);
            logApp.info(response);
            res.json({ response });
        } catch (error) {
            logApp.info("Error", error);
        }
    };

    delete = async (req, res) => {
        try {
            const { id } = req.query;
            if (!id) {
                res.json({});
            }

            const response = await this.api.delete(id);
            logApp.info(response);
            res.json({ response });
        } catch (error) {
            logApp.info("Error", error);
        }
    };
}

export default ControllersProds;