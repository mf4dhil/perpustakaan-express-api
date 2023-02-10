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
    ID_book: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    ID_category: {
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
Categorys.hasMany(BookCategorys)
BookCategorys.belongsTo(Books, {foreignKey: 'ID_book'})
BookCategorys.belongsTo(Categorys, {foreignKey: 'ID_category'})

export default BookCategorys