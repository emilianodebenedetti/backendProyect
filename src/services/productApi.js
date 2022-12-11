import ProductsDAO from "../DAO/products.js";
import { logApp } from "../utils/apiLogs.js";

class ProductsAPI {
    constructor() {
        this.ProductsDAO = ProductsDAO.getInstance();
        this.instance = null;
    }

    static getInstance() {
		if (!this.instance) this.instance = new ProductsAPI();
		return this.instance;
	}

    async getAll() {
        const res = await this.ProductsDAO.getAll();
        return res;
    }

    async get(id) {
        const res = await this.ProductsDAO.get(id);
        return res;
    }

    async addProduct(product) {
        await this.ProductsDAO.addProduct(product);
        logApp.info("Producto guardado");
    }
    async update(id, product) {
        const res = await this.ProductsDAO.update(id, product);
        return res;
    }
    async delete(id) {
    const res = await this.ProductsDAO.delete(id);
        return res;
    }
}
export default ProductsAPI;