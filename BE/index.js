const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const routes = require('./routes/routes');

const connect = require('./database/connection');
const PORT = process.env.PORT || 3000;

// Creazione del server WebSocket
// const wss = new WebSocket.Server({ port: 8080 });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(routes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})
