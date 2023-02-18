import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import Books from "./Book.model.js"
import BookGenres from "./BookGenre.model.js"

const { DataTypes } = Sequelize

const Genres = db.define('genre', 
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

Books.hasMany(Genres, { as: 'Genre' });

export default Genres