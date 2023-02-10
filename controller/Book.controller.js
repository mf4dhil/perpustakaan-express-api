import Books from "../models/Book.model.js"
import BookCategorys from "../models/BookCategory.model.js"
import BookGenres from "../models/BookGenre.model.js"
import Categorys from "../models/Category.model.js"
import Genres from "../models/Genre.model.js"

export const getBook = async (req, res) => {
  const books = await Books.findAll()
  const bookCategory = await BookCategorys.findAll({
    where: {
      ID_book: books.id
    }
  })
  const bookGenre = await BookGenres.findAll({
    where: {
      ID_book: books.id
    }
  })
  if( !books || !bookCategory || !bookGenre ) return res.status(404).json({msg: "Data buku/genre/category tidak ditemukan"})
  try {
    const response = await Books.findAll({
      include: [
        {
          model: Categorys,
          where: {
            id: bookCategory.ID_category
          }
        },
        {
          model: Genres,
          where: {
            id: bookGenre.ID_genre
          }
        }
      ]
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}

export const getBookById = async (req, res) => {
  const books = await Books.findOne({
    where: {
      uuid: req.params.id
    }
  })
  const bookCategory = await BookCategorys.findAll({
    where: {
      ID_book: books.id
    }
  })
  const bookGenre = await BookGenres.findAll({
    where: {
      ID_book: books.id
    }
  })
  if( !books || !bookCategory || !bookGenre ) return res.status(404).json({msg: "Data buku/genre/category tidak ditemukan"})
  try {
    const response = await Books.findOne({
      where: {
        uuid: req.params.id
      },
      include: [
        {
          model: Categorys,
          where: {
            id: bookCategory.ID_category
          }
        },
        {
          model: Genres,
          where: {
            id: bookGenre.ID_genre
          }
        }
      ]
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}
export const createBook = async (req, res) => {
  const { name, author, release_date } = req.body
  
}
export const updateBook = async (req, res) => {

}
export const deleteBook = async (req, res) => {

}