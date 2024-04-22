  const express = require('express');
  const mongoose = require('mongoose');
  const cardRoutes = require('./Routes/Card.routes');
  const projectRoutes = require('./Routes/ManageProject.routes');
  const userRoutes = require('./Routes/User.routes');
  const bodyParser = require('body-parser');
  const { Server } = require("socket.io");
  const http = require('http'); 

  const app = express();
  const PORT = process.env.PORT || 30001;

  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS,PATCH'); 
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
      res.setHeader('Access-Control-Allow-Credentials', true); 
      next();
  });

  mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  const server = http.createServer(app); 

  const io = new Server(server, {
    cors: true,
  });

  app.use(bodyParser.json());
  app.use(express.json());

  app.use('/cards', cardRoutes);
  app.use('/project', projectRoutes);
  app.use('/user', userRoutes);

  const emailToSocketIdMap = new Map();
  const socketidToEmailMap = new Map();

  io.on("connection", (socket) => {
    console.log(`Socket Connected`, socket.id);
    socket.on("room:join", (data) => {
      const { email, room } = data;
      emailToSocketIdMap.set(email, socket.id);
      socketidToEmailMap.set(socket.id, email);
      io.to(room).emit("user:joined", { email, id: socket.id });
      socket.join(room);
      io.to(socket.id).emit("room:join", data);
    });

    socket.on("user:call", ({ to, offer }) => {
      io.to(to).emit("incomming:call", { from: socket.id, offer });
    });

    socket.on("call:accepted", ({ to, ans }) => {
      io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    socket.on("peer:nego:needed", ({ to, offer }) => {
      console.log("peer:nego:needed", offer);
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
      console.log("peer:nego:done", ans);
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
