const express = require("express"),
  app = express(),
  server = require("http").createServer(app),
  io = require("socket.io")(server),
  qrcode = require("qrcode"),
  go = require("open"),
  fs = require("fs"),
  PORT = 5000;

module.exports = (client) => {
  try {
    let lastqr = false;
    client.on("qr", (qr) => {
      qrcode.toDataURL(qr, function (err, url) {
        lastqr = url;
        io.emit("qr", lastqr);
      });
    });
    client.on("open", () => {
      io.emit("con", { jid: client.user.jid });
      lastqr = false;
    });
    client.on("close", () => io.emit("close", "IDLE"));
    io.on("connection", (socket) =>
      lastqr
        ? io.emit("qr", lastqr)
        : io.emit("con", { jid: client.user ? client.user.jid : false })
    );
    app.use(express.static("./public"));
    server.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Server Running on Port ${PORT}`);
        go(`http://localhost:${PORT}`, { app: "google chrome" });
      }
    });
  } catch (e) {}
};