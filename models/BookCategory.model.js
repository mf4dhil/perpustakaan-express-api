import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import Books from "./Book.model.js"
import Categorys from "./Category.model.js"

const { DataTypes } = Sequelize

const BookCategorys = db.define('book_category', 
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
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

Books.hasMany(BookCategorys)
BookCategorys.belongsTo(Books, {foreignKey: 'bookId'})
Categorys.hasMany(BookCategorys)
BookCategorys.belongsTo(Categorys, {foreignKey: 'categoryId'})

export default BookCategorys