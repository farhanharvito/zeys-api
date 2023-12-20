const { Product, Category } = require("../../models");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: "category", attributes: ["name"] }],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, product_category, price, stock } = req.body;

  try {
    const category = await Category.findByPk(product_category);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const newProduct = await Product.create({
      name,
      product_category,
      price,
      stock,
    });
    await newProduct.setCategory(category);

    const productWithCategory = await Product.findByPk(newProduct.id, {
      include: [{ model: Category, as: "category", attributes: ["name"] }],
    });

    res.status(201).json(productWithCategory);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { name, category, price, stock } = req.body;

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.update({ name, category, price, stock });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
