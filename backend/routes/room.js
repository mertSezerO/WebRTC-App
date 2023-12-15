const Router = require('express').Router()

const roomController = require('../controllers/room')

Router.get('/rooms', roomController.getRooms)

module.exports = Router