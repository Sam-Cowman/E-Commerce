const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products with their associated categories and tags
router.get('/', async (req, res) => {
  try {
    // Fetch all products and include associated categories and tags
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    // Send the fetched data with a 200 OK status
    res.status(200).json(productData);
  } catch (err) {
    // Send a 500 Internal Server Error status in case of error
    res.status(500).json(err);
  }
});

// GET a single product by its `id` with associated categories and tags
router.get('/:id', async (req, res) => {
  try {
    // Fetch product by primary key and include associated categories and tags
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    // If no product is found, send a 404 Not Found status
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    // Send the fetched data with a 200 OK status
    res.status(200).json(productData);
  } catch (err) {
    // Send a 500 Internal Server Error status in case of error
    res.status(500).json(err);
  }
});

// POST a new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  // Create a new product with the data from the request body
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// PUT update a product by its `id`
router.put('/:id', (req, res) => {
  // Update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // If there are tags to update
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // Create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });
          // Figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);

          // Run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      // Return the updated product
      return res.json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// DELETE a product by its `id`
router.delete('/:id', async (req, res) => {
  try {
    // Delete the product where the id matches
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no product is found, send a 404 Not Found status
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    // Send the deleted data with a 200 OK status
    res.status(200).json(productData);
  } catch (err) {
    // Send a 500 Internal Server Error status in case of error
    res.status(500).json(err);
  }
});

module.exports = router;
