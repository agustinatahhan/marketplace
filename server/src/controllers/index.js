// const fs = require("fs");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");
// const pathProducts = path.join(__dirname, "../data/products.json");
// const listProductsJson = fs.readFileSync(pathProducts, "utf-8");
// const listProducts = JSON.parse(listProductsJson);
const db = require("../../database/models");
const controller = {
  // index: async (req, res) => {
  //   try {
  //     const listProducts = await db.Product.findAll();
  //     const data = listProducts.map(prod => prod.dataValues);
  //     // res.render("index", { listProducts });
  //     return res.status(200).json(data);
  //   } catch (error) {
  //     // console.error("Error fetching products:", error);
  //     res.status(500).send("Internal Server Error");
  //   }
  // },
  index: async (req, res) => {
    try {
        const listProducts = await db.Product.findAll({
            include: {
                model: db.Category,
                as: 'categories',
                attributes: ['name'],
                through: { attributes: [] },
            },
        });

        const data = listProducts.map(prod => prod.dataValues);

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).send("Internal Server Error");
    }
},
  

  login: (req, res) => res.render("users/login"),
  register: (req, res) => res.render("users/register"),
  cart: (req, res) => res.render("products/productCart"),

  detail: async (req, res) => {
    const { id } = req.params;

    try {
      // const product = listProducts.find((p) => p.id === productId);
      // console.log("Product found:", Array.isArray(product.sizes) );
      // if (product) {
      //   res.render("products/productDetail", { product });
      // } else {
      //   res.status(404).send("Product not found");
      // }
      const product = await db.Product.findOne({
        where: {
          id: id,
        },
      });
      return res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  getFormProduct: (req, res) => res.render("products/createProductForm"),
  postProduct: async (req, res) => {
    try {
      const { name, price, description, sizes, quantity, category } = req.body;
      console.log(req.body);
      if (!name || !price || !description || !quantity) {
        return res.status(400).send("Todos los campos son obligatorios");
      }
  
      const selectedCategory = await db.Category.findByPk(category);
      if (!selectedCategory) {
        return res.status(404).send("La categoría especificada no existe");
      }
  
      const newProduct = await db.Product.create({
        name,
        price,
        description,
        quantity,
        img: req.file.filename || "default.png",
        sizes: sizes || [],
      });
  
      await newProduct.addCategory(selectedCategory);
      console.log(newProduct);

      res.redirect(`/`);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).send("Internal Server Error");
    }
},
  

  getEditForm: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await db.Product.findByPk(id);

      if (product) {
        res.render("products/updateProductForm", { product });
      } else {
        res.send("El producto no existe");
      }
    } catch (error) {
      console.error("Error fetching product details for edit:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  putCreate: async (req, res) => {
    const { id } = req.params;
    const { name, description, price, sizes, quantity } = req.body;
    // const sizes = req.body['sizes[]'];

    try {
      const productToEdit = await db.Product.findByPk(id);

      if (productToEdit) {
        productToEdit.name = name || productToEdit.name;
        productToEdit.description = description || productToEdit.description;
        productToEdit.price = price || productToEdit.price;
        productToEdit.quantity = quantity || productToEdit.quantity;

        // Verificar si se cargó un nuevo archivo
        if (req.file && req.file.filename) {
          productToEdit.img = req.file.filename; // Asignar el nombre del archivo cargado
        }

        // Verificar si sizes está definido y no es null
        if (sizes !== undefined && sizes !== null) {
          // productToEdit.sizes = JSON.parse(sizes) || JSON.parse(productToEdit.sizes);
          productToEdit.sizes = sizes || productToEdit.sizes;
        }

        // if (sizes && Array.isArray(sizes)) {
        //   await productToEdit.setSizes([]); 
        //   const newSizes = await db.Sizes.findAll({ where: { id: sizes } });
        //   await productToEdit.addSizes(newSizes);
        // }

        await productToEdit.save();

        res.redirect("/");
      } else {
        res.send("El producto no existe");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      // const productIndex = listProducts.findIndex((p) => p.id === productId);

      // if (productIndex !== -1) {
      //   // Eliminar el producto del array
      //   listProducts.splice(productIndex, 1);

      //   // Actualizar el archivo JSON
      //   fs.writeFileSync(pathProducts, JSON.stringify(listProducts, null, " "));

      //   res.redirect("/");
      // } else {
      //   res.send("El producto no existe");
      // }
      const productToDelete = await db.Product.findByPk(id);
      if (productToDelete) {
        await productToDelete.destroy();
        res.redirect("/");
      } else {
        res.send("El producto no existe");
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = controller;
