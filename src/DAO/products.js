import { logApp } from "../utils/apiLogs.js";
import Product from "../models/Products.js";


class ProductsDAO {
    constructor(){
        this.instance = null;
    }

    static getInstance(){
        if (!this.instance) this.instance = new ProductsDAO();
        return this.instance;
    }
    
    async addProduct(product) {
        try {
            const addedProd = await Product.create(product);
            return addedProd;
        } catch (error){
            logApp.info("Error", error);
        }
    }

    async getAll() {
        try {
            return await Product.find({});
        } catch (error) {
            logApp.info("Error", error);
        }
    }

    async get(id) {
        try {
            return await Product.findOne({ id });
        } catch (error) {
            logApp.info("Error", error);
        }
    }
    async update(id, product) {
        try {
            return await Product.findOneAndReplace({ id }, product);
        } catch (error){
            logApp.info("Error", error);
        }
    }
    async delete(id) {
        try {
            return await Product.findByIdAndDelete({ id });
        } catch (error) {
            logApp.info("Error", error);
        }
    }
}

export default ProductsDAO;