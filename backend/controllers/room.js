const Room = require('../models/room')

const rooms = [ ]

exports.getRooms = (req, res, next)  => {
    res.status(200).json({ rooms: rooms})
};

exports.createRoom = (req, res, next)  => {
    const room = Room(req.body)
    res.status(201).json({ message: "Room successfully created"})
}