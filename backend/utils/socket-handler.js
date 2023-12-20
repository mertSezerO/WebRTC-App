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

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);

    const roomID = Object.keys(roomMap).find(
      (roomId) => roomManager.getRoom(roomId).users.includes(socket.id)
    );

    if (roomID) {
        roomManager.getRoom(roomID).deleteUser(socket.id)

      if (roomManager.getRoom(roomID).getUsers().length === 0) {
        roomManager.deleteRoom(roomID)
      }

      socket.leave(roomID);
    }
  });
}

module.exports = {handleSocketActions}