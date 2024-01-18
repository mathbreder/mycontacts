const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(req, res) {
    const categories = await CategoriesRepository.findAll();
    res.status(200).json(categories);
  }

  async show(req, res) {
    try {
      const category = await CategoriesRepository.findById(req.params.id);
      if (!category) throw new Error('Category not found');
      res.status(200).json(category);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const category = {
        name: req.body.name,
      };
      if (!category.name) throw new Error('Name is required');
      const savedCategory = await CategoriesRepository.create(category);
      res.status(201).json(savedCategory);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const category = {
        name: req.body.name,
      };
      if (!id) throw new Error('ID is required');
      if (!category.name) throw new Error('Name is required');
      const categoryExists = await CategoriesRepository.findById(req.params.id);
      if (!categoryExists) throw new Error('Category not found');
      const updatedCategory = await CategoriesRepository.update(req.params.id, category);
      res.status(200).json(updatedCategory);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('ID is required');
      const categoryExists = await CategoriesRepository.findById(id);
      if (!categoryExists) throw new Error('Category not found');
      await CategoriesRepository.delete(id);
      res.status(204);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new CategoryController();
