const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const pathProducts = path.join(__dirname, "../data/products.json");
const listProductsJson = fs.readFileSync(pathProducts, "utf-8");
const listProducts = JSON.parse(listProductsJson);

/* const pathUsers = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(pathUsers, "utf-8")); */

const controller = {
  index: (req, res) => res.render("index", {listProducts}),

  login: (req, res) => res.render("users/login"),
  register: (req, res) => res.render("users/register"),
  cart: (req, res) => res.render("products/productCart"),
  detail: (req, res) => res.render("products/productDetail"),

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
  
  update: (req, res) => res.render("products/updateProductForm"),
};

module.exports = controller;
