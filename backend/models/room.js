class Room {

    constructor(name, capacity, privacyType) {
        this.name = name
        this.capacity = capacity
        this.privacyType = privacyType
        this.users = [ ]
    }

    setAdmin(user) {
        this.admin = user
    }
    
    addUser(user) {
        this.users.push(user)
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
        return rooms
    }
}

const roomManager = new RoomManager()

module.exports = {
    Room,
    roomManager
}