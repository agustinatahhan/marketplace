const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = 3000;
const { checkLoggedInWithCookie } = require('./middleware/userLoggedCookie');

// const remembermeMiddleware = require("./middleware/remembermeMiddleware");

app.use(session({
  secret: "Bienvenido",
}));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// Agregar el middleware para verificar la sesión con la cookie antes de las rutas
app.use(checkLoggedInWithCookie);

app.use(cors());
const routesIndex = require("./routes/index");
const usersRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", routesIndex);
app.use("/users", usersRoutes);
app.use("/categories", categoryRoutes);


app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
