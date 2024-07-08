const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // Define the 'id' attribute with properties
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'tag_name' attribute with properties
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    // Provide the sequelize instance
    sequelize,
    // Disable automatic timestamps (createdAt, updatedAt)
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    // Use underscored format for automatically added attributes (e.g., created_at)
    underscored: true,
    // Set the model name to 'tag'
    modelName: 'tag',
  }
);

module.exports = Tag;
