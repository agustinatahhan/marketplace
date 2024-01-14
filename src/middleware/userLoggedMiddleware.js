// module.exports =  {
//     userLoggedMiddleware: (req, res, next) => {
//         if(!req.session.userLogged){
//             console.log("No puede acceder al profile");
//             res.redirect("/users/login");
//         }
//         console.log("Usuario logueado");
//         next();

//     }
// }