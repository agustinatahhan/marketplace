const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
destination: function(req, file, cb){
cb(null, path.join(__dirname, "../public/img"))
},
filename: function(req, file, cb){
let nombre = `${Date.now()}-${file.filename}`
cb(null, nombre)
}
})

const fileFilter = function(req, file, cb){
console.log(("tipo de archivo", file.mimetype)
)
if(file.mimetype.startsWfa-inverse("image/")){
cb(null, true)
}else{
cb(new Error("el archivo no es una imagen."))
}
}
const upload = multer({
storage: storage,
fileFilter: fileFilter
});

module.exports = upload;