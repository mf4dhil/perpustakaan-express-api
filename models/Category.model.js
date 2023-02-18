import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import Books from "./Book.model.js"
import BookCategorys from "./BookCategory.model.js"

const { DataTypes } = Sequelize

const Categorys = db.define('category', 
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  },
  {
    freezeTableName: true
  } 
)

Books.hasMany(Categorys , { as: 'Category' });

export default Categorys