# E-Commerce Back End
Module 13 Challenge

## Description

This project involves building the back end for an e-commerce site using Express.js and Sequelize to interact with a PostgreSQL database. The application provides API routes for managing categories, products, and tags within the database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [Associations](#associations)
- [Seeding the Database](#seeding-the-database)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation
1. Clone the repository:

        git clone https://github.com/yourusername/ecommerce-backend.git
        cd ecommerce-backend
2. Install Dependncies:

        npm install
3. Set up enviroment variables: 

    Create a .env file in the root directory and add the following content:

        DB_NAME='ecommerce_db'
        DB_USER='your_postgres_username'
        DB_PASSWORD='your_postgres_password'
4. Create the database: 

    Use the schema provided in the db/schema.sql file to create the database. Run the following commands in your PostgreSQL shell:

        DROP DATABASE IF EXISTS ecommerce_db;
        CREATE DATABASE ecommerce_db;

## Usage
1. Seed the database: 

        npm run seed
2. Start the server: 

        npm start
3. API testing: 

    Use Insomnia or another API testing tool to interact with the API routes.

## API Routes

### Categories
* GET /api/categories - Get all categories
* GET /api/categories/:id - Get a category by ID
* POST /api/categories - Create a new category

        {
        "category_name": "New Category"
        }
* PUT /api/categories/:id - Update a category by ID


        {
        "category_name": "Updated Category"
        }

* DELETE /api/categories/:id - Delete a category by ID


### Products
* GET /api/products - Get all products
* GET /api/products/:id - Get a product by ID
* POST /api/products - Create a new product

        {
        "product_name": "New Product",
        "price": 19.99,
        "stock": 10,
        "category_id": 1,
        "tagIds": [1, 2]
        }

 * PUT /api/products/:id - Update a product by ID

        {
        "product_name": "Updated Product",
        "price": 24.99,
        "stock": 20,
        "category_id": 1,
        "tagIds": [1, 2]
        }

* DELETE /api/products/:id - Delete a product by ID

### Tags

* GET /api/tags - Get all tags
* GET /api/tags/:id - Get a tag by ID
* POST /api/tags - Create a new tag

        {
        "tag_name": "New Tag"
        }

* PUT /api/tags/:id - Update a tag by ID

        {
        "tag_name": "Updated Tag"
        }

* DELETE /api/tags/:id - Delete a tag by ID

## Models

### Category

* `id`: Integer, primary key, auto increment, not null
* `category_name`: String, not null

### Product
* `id`: Integer, primary key, auto increment, not null
* `product_name`: String, not null
* `price`: Decimal, not null, validates that the value is a decimal
* `stock`: Integer, not null, default value is 10, validates that the value is numeric
* `category_id`: Integer, references the Category model's id

### Tag
* `id`: Integer, primary key, auto increment, not null
* `tag_name`: String

### ProductTag
* `id`: Integer, primary key, auto increment, not null
* `product_id`: Integer, references the Product model's id
* `tag_id`: Integer, references the Tag model's id

### Associations
* Product belongs to Category
* Category has many Products
* Product belongs to many Tags (through ProductTag)
* Tag belongs to many Products (through ProductTag)

## Seeding the Database
To seed the database with initial data, run the following command:

        npm run seed

## Walkthrough Video
Watch my tutorial video here: https://drive.google.com/file/d/1teiglVdim21wCeRCSmOlVX0vLycf-Ij5/view

License
This project is licensed under the MIT License.

Contributing
Contributions are welcome! Please fork the repository and create a pull request to suggest improvements or fixes.

Questions
If you have any questions, please feel free to reach out:

GitHub: [Sam Cowman](https://github.com/Sam-Cowman)
Email: sam.p.cowman@gmail.com