module.exports = (sequelize, DataTypes) => {
    const ProductSize = sequelize.define('ProductSize', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      products_id: {
        type: DataTypes.INTEGER,
        
      },
      sizes_id: {
        type: DataTypes.INTEGER,
      }
    });
  
    return ProductSize;
  };