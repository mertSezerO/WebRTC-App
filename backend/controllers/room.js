const { Room, roomManager } = require('../models/room')

exports.getRooms = (req, res, next)  => {
    const rooms = roomManager.getRooms()
    res.status(200).json({ rooms: rooms})
};

exports.createRoom = (req, res, next)  => {
    const room = new Room(req.body.name, req.body.capacity, req.body.privacyType)
    roomManager.addRoom(room)
    res.status(201).json({
        room: room, 
        message: "Room successfully created"
    })
}