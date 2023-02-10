import Genres from "../models/Genre.model.js";

export const getGenre = async (req, res) => {
  try {
    const response = await Genres.findAll({
      attributes: ['uuid', 'name']
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}

export const createGenre = async (req, res) => {
  try {
    await Genres.create({
      name: req.body.name
    })
    res.status(201).json({msg: "Genre Added Successfully!"})
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}

export const deleteGenre = async (req, res) => {
  try {
    await Genres.destroy({
      where: {
        uuid: req.params.id
      }
    })
    res.status(200).json({msg: "Genre Deleted Successfully!"})
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}