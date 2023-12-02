const fs = require("fs");
const path = require("path");
const pathProductos = path.join(__dirname, "../data/products.json");
const listProductsJson = fs.readFileSync(pathProductos, "utf-8");
const listProducts = JSON.parse(listProductsJson);
/* const pathUsers = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(pathUsers, "utf-8")); */
const { v4: uuidv4 } = require('uuid');

const controller = {
   index: (req, res) => res.render("index"),
   login: (req, res) => res.render("users/login"),
   register: (req, res) => res.render("users/register"),
   cart: (req, res) => res.render("products/productCart"),
   detail: (req, res) => res.render("products/productDetail"),
   
   create: (req, res) => res.render("products/createProductForm"),

   store: (req, res) => {
      const newProduct = {
         id: uuidv4(), 
         ...req.body
      }
      listProducts.push(newProduct);

      console.log(listProducts);

      fs.writeFileSync(pathProductos, JSON.stringify(listProducts, null, ' '));

      res.redirect('/');
   },

   update: (req, res) => res.render("products/updateProductForm"),
  }
  
  module.exports = controller;
   