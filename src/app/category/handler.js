const { Category } = require("../../models");

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.findAll();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await category.update({ name });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "category not found" });
    }

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
