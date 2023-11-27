const controller = {
   index: (req, res) => res.render("index"),
   login: (req, res) => res.render("users/login"),
   register: (req, res) => res.render("users/register"),
   cart: (req, res) => res.render("products/productCart"),
   detail: (req, res) => res.render("products/productDetail"),
   create: (req, res) => res.render("products/createProductForm"),
   update: (req, res) => res.render("products/updateProductForm"),
  }
  
  module.exports = controller;