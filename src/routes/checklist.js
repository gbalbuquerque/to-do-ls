const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist')

router.get('/', async (req, res) => {
  try {
    let checklists = await Checklist.find()
    res.status(200).render('checklists/index', {checklists:checklists})
  } catch (error) {
    res.status(500).render('pages/error',{error: 'Erro ao exbir as Listas'})

  }
})
router.post('/', async (req, res) => {
  let { name } = req.body;
  let checklist = new Checklist({name});
  try {
    await Checklist.save();
    res.redirect('/checklists');
  } catch (error) {
    res.status(402).json(error)
  }
})

router.get('/new', async (req,res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render('checklist/new', {checklist:checklist })
  } catch (error) {
    res.status(500).render('pages/error', {error: 'Erro ao exibir as Listas de tarefas'})
  }
})

router.get('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id)
    res.status(200).render('checklists/show', {checklist:checklist})
    
  } catch (error) {
    res.status(500).render('pages/error', {error: 'Erro ao exibir as Listas de tarefas'})
  }
})

router.put('/:id', async (req, res) => {
  let { name } = req.body
  try {
    let checklist = await Checklist.findByIdAndUpdate(req.params.id, { name }, {new: true});
    res.status(200).json(checklist)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndDelete(req.params.id);
    res.status(200).json(checklist)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router

