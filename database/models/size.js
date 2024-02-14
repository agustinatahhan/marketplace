    module.exports = (sequelize, dataTypes) => {
        let alias = "Sizes";
        let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }, 
        };
        let config = {
        tableName: "Sizes",
        timestamps: false,
        };
        const Size = sequelize.define(alias, cols, config);

        Size.associate = (models) => {
        // Relación con la tabla HistorialCompras
        Size.belongsToMany(models.Product, {
            as: 'products',
            through: 'Products_Sizes',
            foreignKey: 'size_id',
            otherkey: 'product_id',
            timestamps: false
        });

        
        };

        return Size;
  };
  