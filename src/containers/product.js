import fs from "fs";

class Product {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	getAll() {
		const response = fs.readFileSync(`./src/${this.nameFile}`, "utf-8");
		if (response === "") {
			return this.assign(true);
		} else {
			return JSON.parse(response);
		}
	}

	get(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: `Producto no encontrado, hay ${data.length} productos`,
			};
		}
		return data.find((element) => element.id === id);
	}

	save(product) {
		const data = this.getAll();
		product.id = data.length + 1;
		product.timestamp = Date.now();
		product.code = `${product.nombre}${product.timestamp}`;
		data.push(product);
		fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
		return {
			product: product,
		};
	}

	update(id, product) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: `Producto no encontrado, hay ${data.length} productos`,
			};
		} else {
			product.id = id;
			product.timestamp = Date.now();
			product.code = `${product.nombre}${product.timestamp}`;
			const previousProduct = data.splice(id - 1, 1, product);
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
			return {
				previous: previousProduct[0],
				new: product,
			};
		}
	}

	delete(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: `Producto no encontrado, hay ${data.length} productos`,
			};
		} else {
			const previousProduct = data.splice(id - 1, 1);
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
			this.assign();
			return {
				deleted: previousProduct,
			};
		}
	}

	// Agrega id a los productos del json al modificarse
	assign(empty = false) {
		if (empty) {
			let id = 1;
			listProducts.forEach((element) => {
				element.id = id++;
				element.timestamp = Date.now();
				element.code = `${element.nombre}${element.timestamp}`;
			});
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(listProducts));
			return listProducts;
		} else {
			const data = this.getAll();
			let id = 1;
			data.forEach((element) => {
				element.id = id++;
			});
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
		}
	}
}
export default Product;

// Lista de productos por defecto
const listProducts = [
	{
		nombre: "Zapas retro",
		precio: 90500,
		imagen:
			"https://www.iconfinder.com/icons/5668690/fitness_gym_run_shoes_sport_training_icon",
		stock: 10,
		descripcion: "Descripción prod",
		id: 1,
	},
	{
		nombre: "Camisetas",
		precio: 52000,
		imagen:
			"https://cdn2.iconfinder.com/data/icons/men-clothes/512/men-clothes-fashion-03-512.png",
		stock: 10,
		descripcion: "Descripción prod",
		id: 2,
	},
	{
		nombre: "Pantalonetas",
		precio: 80000,
		imagen: "https://cdn0.iconfinder.com/data/icons/textiles/128/trousers_single_lightblue-512.png",
		stock: 10,
		descripcion: "Descripción prod",
		id: 3,
	},
];
