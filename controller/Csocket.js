// 소켓 연결하기
exports.connection = (io, socket) => {
  socket.on("sendMessage", (message) => {
    socket.emit("newMessage", message.message, message.nick);
  });
};
