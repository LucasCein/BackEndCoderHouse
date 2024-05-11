import fs from "fs";
import uuid4 from "uuid4";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.initProducts();
  }

  initProducts = async () => {
    try {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            if (data.trim().length === 0) {  
                this.products = [];
            } else {
                this.products = JSON.parse(data);
            }
        } else {
            this.products = [];
        }
    } catch (error) {
        console.error('Failed to initialize products:', error);
        this.products = [];
    }
}


  getProducts = async (limit) => {
    return limit ? this.products.slice(0, limit) : this.products;
  };
  getProductById = async (id) => {
    const products = await this.getProducts();
    const product = products.find((product) => product.id === id);
    return product;
  };
  insertProduct = async (product) => {
    const { title, description, price, thumbnail, code, stock, category } =
      product;
    if (!title || !description || !price || !code || !stock || !category) {
      return null;
    }

    if (this.products.some((p) => p.code === code)) {
      return null; 
    }

    const newProduct = {
      id: uuid4(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status: true, 
    };

    this.products= [...this.products, newProduct];
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, 2)
    );
    return newProduct;
  };

  updateProduct = async (id, updates) => {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      return null;
    }

    
    const existingProduct = this.products[index];
    const updatedProduct = {...existingProduct, ...updates};

    this.products[index] = updatedProduct;

    
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));

    return this.products[index];
};


  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
      return null;
    }
    products.splice(index, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return products;
  };
}
