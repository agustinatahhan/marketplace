const { trace } = require("console");
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

// app.use(express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("users/login");
});

app.get("/register", (req, res) => {
  res.render("users/register");
});

app.get("/cart", (req, res) => {
  res.render("products/productCart");
});

app.get("/detail", (req, res) => {
  res.render("products/productDetail");
});

app.get("/create", (req, res) => {
  res.render("products/createProductForm");
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "login.html"));
// });

// app.get("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "register.html"));
// });

// app.get("/cart", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "productCart.html"));
// });

// app.get("/detail", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "productDetail.html"));
// });

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

