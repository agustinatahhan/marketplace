const fs = require("fs");
const path = require("path");
const db = require("../../database/models");

module.exports = {
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).send("El nombre de la categoría es obligatorio");
            }

            const newCategory = await db.Category.create({ name });

            res.status(201).json(newCategory);
        } catch (error) {
            console.error("Error al crear la categoría:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    getCategories: async (req, res) => {
        try {
            const categories = await db.Category.findAll();

            res.json(categories);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
}
  
