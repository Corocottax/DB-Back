const express = require('express');
const Character = require('./characters.model');
const upload = require("../../middlewares/file");
const { deleteFile } = require('../../middlewares/deleteFile');
const { isAuth, isAdmin } = require('../../middlewares/auth');
const router = express.Router();

//* FUNCION QUE RECOGE TODOS LOS PERSONAJES
router.get('/', async(req, res) => {
  try {
    const allCharacters = await Character.find();
    return res.status(200).json(allCharacters);
  } catch(error) {
    return res.status(500).json('Error en el servidor');
  }
});

//* FUNCION QUE RECOGE UN PERSONAJE POR ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const characterToFind = await Character.findById(id);
    return res.status(200).json(characterToFind);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//* FUNCIÓN QUE RECOGE UN PERSONAJE POR NOMBRE
router.get('/getbyname/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const characterToFind = await Character.findOne({name: name});
    return res.status(200).json(characterToFind);
  } catch (error) {
    return res.status(500).json('No se encontró el personaje');
  }
});

//* FUNCIÓN QUE CREA UN PERSONAJE
// lo que va dentro de upload.single es el campo del model en el que va la imagen
router.post('/create', upload.single("img"), async (req, res) => {

  try {
    const character = req.body;
    if (req.file) {
      character.img = req.file.path;
    }
    const newCharacter = new Character(character);
    const created = await newCharacter.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json('Error al crear el personaje');
  }

});

//* FUNCIÓN QUE ELIMINA UN PERSONAJE
router.delete('/delete/:id', async (req, res) => {

  try {
    const id = req.params.id;
    const characterToDelete = await Character.findByIdAndDelete(id);
    return res.status(200).json("Se ha conseguido borrar el personaje");
  } catch (error) {
    return res.status(500).json('Error al borrar el personaje');
  }

});

//* FUNCIÓN QUE EDITA UN PERSONAJE
router.put('/edit/:id', upload.single("img"), async (req, res) => {

  try {
    const id = req.params.id;
    const character = req.body;
    const characterOld = await Character.findById(id);
    if (req.file) {
      if (characterOld.img) {
        deleteFile(characterOld.img);
      }
      character.img = req.file.path;
    }
    const characterModify = new Character(character);
    characterModify._id = id;
    const characterUpdated = await Character.findByIdAndUpdate(id, characterModify);
    return res.status(200).json({mensaje: "Se ha conseguido editar el personaje", characterModificado: characterUpdated});
  } catch (error) {
    return res.status(500).json('Error al editar el personaje');
  }

})

module.exports = router;