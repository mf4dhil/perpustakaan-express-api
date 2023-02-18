import { Op } from "sequelize"
import Books from "../models/Book.model.js"
import BookCategorys from "../models/BookCategory.model.js"
import BookGenres from "../models/BookGenre.model.js"
import Categorys from "../models/Category.model.js"
import Genres from "../models/Genre.model.js"

export const getBook = async (req, res) => {
  try {
    const response = await Books.findAll({
      attributes: ['uuid', 'name', 'author', 'release_date'],
      include: [
        {
          model: BookCategorys,
          attributes: ['uuid', 'bookId', 'categoryId']
        },
        {
          model: BookGenres,
          attributes: ['uuid', 'bookId', 'genreId']
        }
      ]
    })
    res.status(200).json({msg: response})
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}

export const getBookById = async (req, res) => {
  try {
    const response = await Books.findOne({
      attributes: ['uuid', 'name', 'author', 'release_date'],
      where: {
        uuid: req.params.id
      },
      include: [
        {
          model: BookCategorys,
          attributes: ['uuid', 'bookId', 'categoryId']
        },
        {
          model: BookGenres,
          attributes: ['uuid', 'bookId', 'genreId']
        }
      ]
    })
    res.status(200).json({msg: response})
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}
export const createBook = async (req, res) => {
  const { name, author, release_date, genre1, genre2, genre3, category1, category2 } = req.body
  const gnr = await Genres.findAll({
    where: {
      [Op.or]: [{name: genre1},{name: genre2},{name: genre3},]
    }
  })
  console.log(gnr)
  const ctgr = await Categorys.findAll({
    where: {
      [Op.or]: [{name: category1}, {name: category2}]
    }
  })
  if( !gnr[0] && !gnr[1] ) return res.status(400).json({msg: "Minimal terdapat Dua genre!"})
    if( !ctgr[0] && !ctgr[1] ) return res.status(400).json({msg: "Minimal terdapat Dua Category!"})
  try {
    await Books.create(
      {
        name: name,
        author: author,
        release_date: release_date
      }
    )
    const book = await Books.findOne({
      where: {
        [Op.and]: [{name: name}, {author: author}, {release_date: release_date}]
      }
    })
    if( !book ) return res.status(404).json({msg: "Book tidak ditemukan"})
    
    if( !gnr[2] ) {
      await BookGenres.bulkCreate([
        {
          bookId: book.id,
          genreId: gnr[0].id
        },
        {
          bookId: book.id,
          genreId: gnr[1].id
        }
      ])
    } else {
      await BookGenres.bulkCreate([
        {
          bookId: book.id,
          genreId: gnr[0].id
        },
        {
          bookId: book.id,
          genreId: gnr[1].id
        },
        {
          bookId: book.id,
          genreId: gnr[2].id
        }
      ])
    }
    if( !ctgr[1] ) {
      await BookCategorys.create({
        bookId: book.id,
        categoryId: ctgr[0].id
      })
    } else {
      await BookCategorys.bulkCreate([
        {
          bookId: book.id,
          categoryId: ctgr[0].id
        },
        {
          bookId: book.id,
          categoryId: ctgr[1].id
        }
      ])
    }
    res.status(201).json({msg: "Books Created Successfully!"})
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}

export const updateBook = async (req, res) => {

}
export const deleteBook = async (req, res) => {

}