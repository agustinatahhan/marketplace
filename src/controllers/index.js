const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const pathProducts = path.join(__dirname, "../data/products.json");
const listProductsJson = fs.readFileSync(pathProducts, "utf-8");
const listProducts = JSON.parse(listProductsJson);

const controller = {
  index: (req, res) => res.render("index", { listProducts }),

  login: (req, res) => res.render("users/login"),
  register: (req, res) => res.render("users/register"),
  cart: (req, res) => res.render("products/productCart"),

  detail: (req, res) => {
    const productId = req.params.id;
    const product = listProducts.find((p) => p.id === productId);
    res.render("products/productDetail", { product });
  },

  getFormProduct: (req, res) => res.render("products/createProductForm"),

  postProduct: (req, res) => {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const newProduct = {
      id: uuidv4(),
      ...req.body,
      img: req.file.filename || "default.png",
    };
    listProducts.push(newProduct);

    console.log("listProducts:", listProducts);

    let listProductsJSON = JSON.stringify(listProducts, null, " ");
    fs.writeFileSync(pathProducts, listProductsJSON);

    res.redirect("/");
  },

  getEditForm: (req, res) => {
    const id = req.params.id;
    console.log("ID from URL:", id);

    const product = listProducts.find(
      (clothes) => clothes.id.toString() === id.toString()
    );
    if (product) {
      res.render("products/updateProductForm", { product });
    } else {
      res.send("El producto no existe");
    }
  },

  putCreate: (req, res) => {
    const { id } = req.params;
    const { name, description, price, sizes, category } = req.body;
    const productToEdit = listProducts.find((clothes) => clothes.id == id);

    productToEdit.name = name || productToEdit.name;
    productToEdit.description = description || productToEdit.description;
    productToEdit.price = price || productToEdit.price;
    productToEdit.img = req.file.filename || productToEdit.img;

    if (sizes && Array.isArray(sizes)) {
      productToEdit.sizes = sizes;
    }

    productToEdit.category = category || productToEdit.category;
    fs.writeFileSync(pathProducts, JSON.stringify(listProducts, null, " "));
    res.redirect("/");
  },
  destroy: (req, res) => {
    const id = req.params.id;
    const productToDelete = listProducts.find((product) => product.id === id);

    if (!productToDelete) {
      return res.status(404).send("Producto no encontrado");
    }

    // Utiliza filter y asigna el resultado a listProducts
    listProducts = listProducts.filter((product) => product.id !== id);

    fs.writeFileSync(pathProducts, JSON.stringify(listProducts, null, " "));

    const imagePath = path.join(
      __dirname,
      "../../public/img/",
      productToDelete.img
    );
    fs.unlinkSync(imagePath);

    res.redirect("/");
  },
};

module.exports = controller;
