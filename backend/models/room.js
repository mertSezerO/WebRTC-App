class Room {

    constructor(name, capacity, privacyType) {
        this.name = name
        this.capacity = capacity
        this.privacyType = privacyType
    }

    setAdmin(user) {
        this.admin = user
    }   
}

module.exports = Room