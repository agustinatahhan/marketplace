const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = 3000;
// const remembermeMiddleware = require("./middleware/remembermeMiddleware");

const routesIndex = require("./routes/index");
const usersRoutes = require("./routes/users");

app.use(session({
  secret: "Bienvenido",
  resave: true,
  saveUninitialized: false
}));
// app.use(cookieParser);
// app.use(remembermeMiddleware);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", routesIndex);
app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
