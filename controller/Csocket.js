// 소켓 연결하기
exports.connection = (io, socket) => {
  console.log("소켓 id", socket.id);

  socket.on("sendMessage", (message) => {
    console.log(message);

    socket.emit("newMessage", message.message, message.nick);
  });
};
