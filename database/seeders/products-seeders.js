module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("productos", [
        {
          nombre: "Pantalón Gris",
          description: "Pantalón ancho, tiro alto, formal",
          precio: 47000,
          sizes: ["M", "L", "XL"],
          img: "1702336557936-1702316960648-pantalon2.jpeg"
        },
        {
          nombre: "Camisa Oversize",
          description: "Camisa oversize beige",
          precio: 20000,
          sizes: ["S", "M", "L"],
          img: "1702316996147-camisaHueso.jpg"
        },
        {
          nombre: "Musculosa Negra",
          description: "Musculosa negra básica, de algodón 100%",
          precio: 10000,
          sizes: ["S", "M", "XL"],
          img: "1702335732293-1702317037890-musculosaNegra.jpg"
        },
        {
          nombre: "Pantalón Marrón",
          description: "Pantalón marrón ancho, tiro alto",
          precio: 50000,
          sizes: ["M", "L", "XL"],
          img: "1702317065823-ropa.jpeg"
        },
        {
          nombre: "Vestido Negro",
          description: "Vestido negro corto, con un pequeño tajo y tiras finas",
          precio: 45000,
          sizes: ["S", "M"],
          img: "1702317094158-vestidoNegro.jpg"
        },
        {
          nombre: "Vestido Blanco",
          description: "Vestido blanco corto con mangas y lazo",
          precio: 36000,
          sizes: ["S", "M", "L", "XL"],
          img: "1702317161567-vestidoBlanco.jpg"
        },
        {
          nombre: "Vestido Rosa",
          description: "Vestido rosa largo con mangas, oversize",
          precio: 22000,
          sizes: ["M", "L", "XL"],
          img: "1702317190697-vestidoRosa.jpg"
        },
        {
          nombre: "Sweater Beige",
          description: "Sweater de lana beige oversize",
          precio: 28000,
          sizes: ["M", "L"],
          img: "1702317215445-sweaterBeige.jpg"
        },
        {
          nombre: "Chaleco Marrón",
          description: "Chaleco marrón tejido con lazos a los costados",
          precio: 25000,
          sizes: ["S", "M", "L", "XL"],
          img: "1702317241294-chaleco.jpg"
        },
      ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("productos", null, {});
    },
  };