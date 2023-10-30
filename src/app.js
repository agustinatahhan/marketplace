const { trace } = require("console");
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "productCart.html"));
});

app.get("/detail", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "productDetail.html"));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

/* ------------------------CARROUSEL ARROWS----------------------------- */
// function app() { }
// window.onload = function (event) {
//   var app = new app();
//   window.app = app;
// }
// app.prototype.processingButton = function (event) {
//   const btn = event.currentTarget;
//   const carrouselList = recent.currentTarget.parentNode;
//   const track = event.currentTarget.parentNode.querySelector('#track');
//   const carrousel = track.querySelectorAll('.carrousel');

//   const carrouselWidth = carrousel[0].offsetWidth;

//   const trackWidth = track.offsetWidth;
//   const listWidth = carrouselList.offsetWidth;

//   track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);
//   btn.dataset.button == "button-prev" ? prevAction(leftPosition, carrouselWidth, track) : nextAction(leftPosition, trackWidth, carrouselWidth, track);
// }
// let prevAction = (leftPosition, carrouselWidth, track) => {
//   if (leftPsoition > 0) {
//     track.style.left = `${-1 * (leftPosition - carrouselWidth)}px`;
//   }
// }

// let nextAction = (leftPosition, trackWidth, listWidth, carrouselWidth, track) => {
//   if (leftPosition < (trackWidth.listWidth)) {
//     track.style.left = `${-1 * (leftPosition * carrouselWidth)}px`;
//   }
// }
// /* ---------------------------------------------------------------------- */