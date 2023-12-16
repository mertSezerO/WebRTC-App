const { Room, roomManager } = require('../models/room')

exports.getRooms = (req, res, next)  => {
    const rooms = roomManager.getRooms()
    res.status(200).json({ rooms: rooms})
};

exports.createRoom = (req, res, next)  => {
    const room = Room(req.body)
    roomManager.addRoom(room)
    res.status(201).json({ message: "Room successfully created"})
}