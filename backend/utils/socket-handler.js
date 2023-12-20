const { roomManager } = require('../models/room');

function handleSocketActions(io, socket) {
    console.log(`User ${socket.id} connected`);

  socket.on('join-room', (roomID) => {
    socket.join(roomID);
    roomManager.getRoom(roomID).addUser(socket.id);
  });

  socket.on('offer', (offer, targetSocketId, roomID) => {
    io.to(targetSocketId).emit('offer', offer, socket.id, roomID);
  });

  socket.on('answer', (answer, targetSocketId) => {
    io.to(targetSocketId).emit('answer', answer);
  });

  socket.on('ice-candidate', (candidate, targetSocketId) => {
    io.to(targetSocketId).emit('ice-candidate', candidate);
  });

  socket.on('leave-room', () => {
    console.log(`User ${socket.id} disconnected`);

    const roomInc = roomManager.getRooms().find(
      (room) => room.users.includes(socket.id)
    );

    if (roomInc) {
      roomInc.deleteUser(socket.id)

      if (roomInc.getUsers().length === 0) {
        roomManager.deleteRoom(roomInc.id)
      }

      socket.leave(roomInc.id);
    }
  });
}

module.exports = {handleSocketActions}