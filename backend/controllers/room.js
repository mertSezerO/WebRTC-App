const Room = require('../models/room')

const rooms = [ ]

exports.getRooms = (req, res, next)  => {
    res.status(200).json({ rooms: rooms})
};