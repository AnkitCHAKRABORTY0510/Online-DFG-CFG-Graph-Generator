const WebSocket = require('ws');
const { createContainer, deleteContainer } = require('./docker-server');
const pty = require('node-pty');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const unzipper = require('unzipper'); // Install this with `npm install unzipper


const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    let containerId = null;
    let ptyProcess = null;

    // Create a new container on client connection
    createContainer((err, id) => {
        if (err) {
            ws.send(JSON.stringify({ type: 'error', message: 'Failed to create container' }));
            return ws.close();
        }

        containerId = id;
        ws.send(JSON.stringify({ type: 'containerId', id: containerId }));

        // Spawn a PTY process for the Docker container
        ptyProcess = pty.spawn('docker', ['exec', '-it', containerId, 'bash'], {
            name: 'xterm-color',
            cols: 80,
            rows: 24,
            cwd: process.env.HOME,
            env: process.env,
        });

        // Forward PTY output to client
        ptyProcess.on('data', (data) => ws.send(data));

        // Handle client input
        ws.on('message', (msg) => {
            const message = JSON.parse(msg);

            if (message.type === 'command') {
                ptyProcess.write(message.data); // Write command to the PTY
            } else if (message.type === 'file') {
                // Handle file transfer
                handleFileTransfer(containerId, message.fileName, message.fileData);
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
            if (ptyProcess) ptyProcess.kill();
            if (containerId) {
                deleteContainer(containerId, (err) => {
                    if (err) console.error(`Error deleting container ${containerId}`);
                });
            }
        });
    });
});
///home/clouduser
// Handle file upload to container
function handleFileTransfer(containerId, fileName, fileData) {
    try {
        // Convert the file data back into a Buffer
        const fileBuffer = Buffer.from(fileData); // Handles Array-like object

        // Temporary file path
        const tempFilePath = path.join('/tmp', fileName);

        // Write buffer to a temporary file
        fs.writeFileSync(tempFilePath, fileBuffer);

        // Copy the file to the container
        exec(`docker cp ${tempFilePath} ${containerId}:/home/clouduser/codes/${fileName}`, (err) => {
            if (err) {
                console.error(`Failed to copy file to container: ${err.message}`);
            } else {
                console.log(`File ${fileName} successfully copied to container ${containerId}`);
            }

            // Clean up temporary file
            fs.unlinkSync(tempFilePath);
            zipFilePath=`${containerId}:/home/clouduser/codes/${fileName}`;

            processAndCompileFiles(containerId,zipFilePath);
        });
    } catch (error) {
        console.error(`Error in handleFileTransfer: ${error.message}`);
    }
}


function processAndCompileFiles(containerId, zipFilePath) {
    try {
        // Extract the base name of the zip file (without extension)
        const zipBaseName = path.basename(zipFilePath, '.zip');

        // Define the extraction directory in the container
        const extractDir = `/home/clouduser/codes/${zipBaseName}`;

        // Step 1: Unzip the file inside the container to the specific directory
        const unzipCommand = `docker exec ${containerId} mkdir -p ${extractDir} && unzip -o /home/clouduser/codes/${zipBaseName} -d ${extractDir}`;
        
        exec(unzipCommand, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error extracting zip file: ${stderr || err.message}`);
                return;
            }

            console.log(`File extracted to: ${extractDir}`);
            // Step 2: Compile the C files inside the extracted directory using clang
            compileCFiles(containerId, extractDir);
        });
    } catch (error) {
        console.error(`Error in processAndCompileFiles: ${error.message}`);
    }
}

function compileCFiles(containerId, dir) {
    const compileCommand = `docker exec ${containerId} clang -o ${dir}/a.out ${dir}/*.c -lm`;

    exec(compileCommand, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error compiling files: ${stderr || err.message}`);
            return;
        }

        console.log('Compilation successful. a.out generated.');
        // Optional: You could return or handle the a.out file after this point
        // You could also execute the compiled binary using:
        // executeBinary(containerId, dir);
    });
}




console.log('WebSocket server running on ws://192.168.0.100:3001');
