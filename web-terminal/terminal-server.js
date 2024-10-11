const pty = require('node-pty');
const WebSocket = require('ws');
const { createContainer, deleteContainer } = require('./docker-server');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    let containerId = null;
    let ptyProcess = null;

    // Create a Docker container when a client connects
    createContainer((err, id) => {
        if (err) {
            ws.send('Error creating container');
            ws.close();
            return;
        }
        containerId = id;
        ws.send(`Connected to container: ${containerId}\r\n`);

        // Spawn a PTY process to interact with the container
        ptyProcess = pty.spawn('docker', ['exec', '-it', containerId, 'sh'], {
            name: 'xterm-color',
            cols: 80,
            rows: 200,
            cwd: process.env.HOME,
            env: process.env
        });

        // Forward PTY data to WebSocket (client)
        ptyProcess.on('data', (data) => {
            ws.send(data); // Send real-time data from the PTY to the client
        });

        // Handle client input (send client keystrokes to PTY)
        ws.on('message', (message) => {
            ptyProcess.write(message); // Write real-time input to the PTY
        });

        // Handle WebSocket closure
        ws.on('close', () => {
            console.log('Client disconnected');
            if (ptyProcess) {
                ptyProcess.kill(); // Kill PTY process
            }
            if (containerId) {
                deleteContainer(containerId, (err) => {
                    if (err) console.error(`Error deleting container ${containerId}`);
                });
            }
        });
    });
});

console.log('WebSocket server running on ws://localhost:8080');
