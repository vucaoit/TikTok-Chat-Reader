require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { TikTokConnectionWrapper, getGlobalConnectionCount } = require('./connectionWrapper');
const { clientBlocked } = require('./limiter');

const app = express();
const httpServer = createServer(app);

// Enable cross origin resource sharing
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});


io.on('connection', (socket) => {
    io.emit('message', "hello");
});

// Emit global connection statistics
setInterval(() => {
    io.emit('message', "hello 1");
}, 100)
setInterval(() => {
    io.emit('message', "hello 2");
}, 120)
setInterval(() => {
    io.emit('message', "hello 3");
}, 80)
// Start http listener
const port = process.env.PORT || 8083;
httpServer.listen(port);
console.info(`Server running! Please visit http://localhost:${port}`);