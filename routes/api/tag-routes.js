const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags with their associated products
router.get('/', async (req, res) => {
  try {
    // Fetch all tags and include associated products through the ProductTag join table
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    // Send the fetched data with a 200 OK status
    res.status(200).json(tagData);
  } catch (err) {
    // Send a 500 Internal Server Error status in case of error
    res.status(500).json(err);
  }
});

// GET a single tag by its `id` with associated products
router.get('/:id', async (req, res) => {
  try {
    // Fetch tag by primary key and include associated products through the ProductTag join table
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    // If no tag is found, send a 404 Not Found status
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    // Send the fetched data with a 200 OK status
    res.status(200).json(tagData);
  } catch (err) {
    // Send a 500 Internal Server Error status in case of error
    res.status(500).json(err);
  }
});

// POST a new tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag with the data from the request body
    const tagData = await Tag.create(req.body);
    // Send the created data with a 200 OK status
    res.status(200).json(tagData);
  } catch (err) {
    // Send a 400 Bad Request status in case of error
    res.status(400).json(err);
  }
});

// PUT update a tag by its `id`
router.put('/:id', async (req, res) => {
  try {
    // Update the tag with the data from the request body where the id matches
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If no tag is found, send a 404 Not Found status
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    // Send the updated data with a 200 OK status
    res.status(200).json(tagData);
  } catch (err) {
    // Send a 500 Internal Server Error status in case of error
    res.status(500).json(err);
  }
});

// DELETE a tag by its `id`
router.delete('/:id', async (req, res) => {
  try {
    // Delete the tag where the id matches
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no tag is found, send a 404 Not Found status
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    // Send the deleted data with a 200 OK status
    res.status(200).json(tagData);
  } catch (err) {
    // Send a 500 Internal Server Error status in case of error
    res.status(500).json(err);
  }
});

module.exports = router;
