const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

// Define the base folder for received files
const BASE_FOLDER = path.join(__dirname, 'received_files');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', async function incoming(data) {
        console.log('Received data from client');
        
        const zip = new JSZip();
        await zip.loadAsync(data); // Load the incoming binary ZIP data

        // Ensure the base directory for received files exists
        if (!fs.existsSync(BASE_FOLDER)) {
            fs.mkdirSync(BASE_FOLDER, { recursive: true });
        }

        zip.forEach((relativePath, file) => {
            // Get the session ID from the file path (i.e., folderName in client)
            const sessionFolder = relativePath.split('/')[0]; // First folder is the session ID
            const sessionPath = path.join(BASE_FOLDER, sessionFolder); // Create session path

            // Ensure that the session directory exists
            if (!fs.existsSync(sessionPath)) {
                fs.mkdirSync(sessionPath, { recursive: true });
            }

            const fullPath = path.join(BASE_FOLDER, relativePath);

            // Check if it's a directory or a file
            if (!file.dir) {
                // Ensure directories exist before writing the file
                fs.mkdirSync(path.dirname(fullPath), { recursive: true });

                file.async('nodebuffer').then(content => {
                    // Write the actual file (skip directories)
                    fs.writeFileSync(fullPath, content);
                });
            }
        });

        ws.send('Files received and saved successfully!');
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server started on ws://localhost:8080');
