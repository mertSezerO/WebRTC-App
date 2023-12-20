const { v4: uuidv4 } = require('uuid');

class Room {

    constructor(name, capacity, privacyType) {
        this.name = name
        this.capacity = capacity
        this.privacyType = privacyType
        this.id = uuidv4();
        this.users = [ ]
    }

    setAdmin(user) {
        this.admin = user
    }
    
    addUser(user) {
        this.users.push(user)
    }

    getUsers() {
        return this.users
    }

    deleteUser(user) {
        delete this.users[user]
    }
}

class RoomManager{

    constructor() {
        this.rooms = [ ]
    }

    addRoom(room) {
        this.rooms.push(room)
    }

    removeRoom(room) {
        this.rooms.filter(item => item !== room)
    }

    getRooms() {
        return this.rooms
    }

    getRoom(roomId) {
        return this.rooms.find((room) => room.id === roomId)
    }

    deleteRoom(roomId) {
        this.rooms.filter((room) => room.id !== roomId) 
    }
}

const roomManager = new RoomManager()

module.exports = {
    Room,
    roomManager
}