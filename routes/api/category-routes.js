const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// GET all categories with their associated products
router.get('/', async (req, res) => {
  try {
    // Fetch all categories and include associated products
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    // Send the fetched data with a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Send a 500 Internal Server Error status in case of error
    res.status(500).json(err);
  }
});

// GET a single category by its `id` with associated products
router.get('/:id', async (req, res) => {
  try {
    // Fetch category by primary key and include associated products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // If no category is found, send a 404 Not Found status
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    // Send the fetched data with a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Send a 500 Internal Server Error status in case of error
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category with the data from the request body
    const categoryData = await Category.create(req.body);
    // Send the created data with a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Send a 400 Bad Request status in case of error
    res.status(400).json(err);
  }
});

// PUT update a category by its `id`
router.put('/:id', async (req, res) => {
  try {
    // Update the category with the data from the request body where the id matches
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If no category is found, send a 404 Not Found status
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    // Send the updated data with a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Send a 500 Internal Server Error status in case of error
    res.status(500).json(err);
  }
});

// DELETE a category by its `id`
router.delete('/:id', async (req, res) => {
  try {
    // Delete the category where the id matches
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no category is found, send a 404 Not Found status
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    // Send the deleted data with a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Send a 500 Internal Server Error status in case of error
    res.status(500).json(err);
  }
});

module.exports = router;
