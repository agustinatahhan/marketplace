const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const port = 3000;

const routesIndex = require("./routes/index");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride("_method"))

app.use(express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", routesIndex)

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

