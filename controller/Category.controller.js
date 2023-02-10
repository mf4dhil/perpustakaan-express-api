import Categorys from "../models/Category.model.js";

export const getCategory = async (req, res) => {
  try {
    const response = await Categorys.findAll({
      attributes: ['uuid', 'name']
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}

export const createCategory = async (req, res) => {
  try {
    await Categorys.create({
      name: req.body.name
    })
    res.status(201).json({msg: "Category Added Successfully!"})
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}

export const deleteCategory = async (req, res) => {
  try {
    await Categorys.destroy({
      where: {
        uuid: req.params.id
      }
    })
    res.status(200).json({msg: "Category Deleted Successfully!"})
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}