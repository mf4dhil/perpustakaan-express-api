import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import Books from "./Book.model.js"
import Genres from "./Genre.model.js"

const { DataTypes } = Sequelize

const BookGenres = db.define('book_genre', 
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
    ID_genre: {
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

Books.hasMany(BookGenres)
Genres.hasMany(BookGenres)
BookGenres.belongsTo(Books, {foreignKey: 'ID_book'})
BookGenres.belongsTo(Genres, {foreignKey: 'ID_genre'})

export default BookGenres