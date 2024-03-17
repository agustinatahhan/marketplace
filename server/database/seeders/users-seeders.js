module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("usuarios", [
      {
        firstName: "agustina",
        lastName: "tahhan",
        email: "agus@gmail.com",
        password: "$2a$10$ZA.yE1hn5j9ORk0t/dqHL.rCYSKgqFtrdMMdrZmxX84YfXDojmxkG",
        image: "1705406765918_img.jpeg"
      },
      {
        firstName: "esteban",
        lastName: "trejo",
        email: "esteban@gmail.com",
        password: "$2a$10$5kwvesTYazP9DY2.iZNrSe.mRpbJeCDxbvITJTsZNELgcb7Jc.6M.",
        image: "1705416073422_img.jpg"
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("usuarios", null, {});
  },
};