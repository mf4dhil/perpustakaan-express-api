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
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    genreId: {
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
BookGenres.belongsTo(Books, {foreignKey: 'bookId'})
Genres.hasMany(BookGenres)
BookGenres.belongsTo(Genres, {foreignKey: 'genreId'})

export default BookGenres