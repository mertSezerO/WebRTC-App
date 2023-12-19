function handleSocketActions(io, socket) {
    console.log(`User ${socket.id} connected`);

  socket.on('join-room', (roomID) => {
    socket.join(roomID);

    if (!roomMap[roomID]) {
      roomMap[roomID] = new Room('Room Name', 10, 'private'); 
    }

    roomMap[roomID].addUser(socket.id);
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
      (roomId) => roomMap[roomId].users.includes(socket.id)
    );

    if (roomID) {
      roomMap[roomID].users = roomMap[roomID].users.filter(
        (userId) => userId !== socket.id
      );

      if (roomMap[roomID].users.length === 0) {
        delete roomMap[roomID];
      }

      socket.leave(roomID);
    }
  });
}

module.exports = handleSocketActions