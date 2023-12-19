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
        message: "Successfully created"
    })
}

exports.getRoom = (req, res, next) => {
    const id = req.params.roomId;
    const room = roomManager.getRoom(id)
    res.status(200).json({
        room: room,
        message: "Successfully gathered"
    })
}