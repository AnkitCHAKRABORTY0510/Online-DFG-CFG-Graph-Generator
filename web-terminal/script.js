console.log("hello-world from webterm");

// Initialize WebSocket and Terminal
const ws = new WebSocket('ws://192.168.0.100:3001');
const term = new Terminal();

// Correct FitAddon initialization and attach to terminal
const fitAddon = new window.FitAddon.FitAddon();
term.loadAddon(fitAddon);
const terminalElement = document.getElementById('terminal');

// Attach the terminal to the DOM element
term.open(terminalElement);

// Use fitAddon to resize the terminal to fill the container
fitAddon.fit();

// Monitor resizing of terminal container using ResizeObserver
const resizeObserver = new ResizeObserver(() => {
    fitAddon.fit();  // Adjust terminal size dynamically on container resize
});

// Observe the terminal's parent container for size changes
resizeObserver.observe(terminalElement);

// Inject CSS styles dynamically to .xterm-rows
const style = document.createElement('style');
style.innerHTML = `
    .xterm .xterm-screen {
        position: relative !important;
        width: inherit !important;
        height: inherit !important;
    }

    .xterm .xterm-rows {
        line-height: normal !important;
        letter-spacing: 0px !important;
        height: -webkit-fill-available !important;
    }

    #terminal {
        width: 100%;
        height: 100%;
    }
`;
document.head.appendChild(style);

// Call fitAddon.fit() again when the window is resized
window.addEventListener('resize', () => {
    fitAddon.fit();
});

// Variable to store the container ID
let containerId = null;

// Open WebSocket connection to the server
ws.onopen = () => {
    console.log('Connected to server');
};

// Handle user data input and send to server
term.onData(data => {
    ws.send(JSON.stringify({ type: 'command', data }));
});

// Handle incoming WebSocket messages (real-time PTY output)
ws.onmessage = function(event) {
    let message;

    // Try parsing the message as JSON
    try {
        message = JSON.parse(event.data);
    } catch (e) {
        // If it's not valid JSON, treat it as raw terminal output
        message = null;
    }

    // If the message is a valid JSON object with a type of 'containerId'
    if (message && message.type === 'containerId') {
        containerId = message.id;
        console.log('Container ID received:', containerId);
        term.write('This is a terminal where you can manually debug & Generate the graph or can install required libraries to be used' + '\r\n');
        // Display the container ID in the terminal
        term.write('Container ID: ' + containerId + '\r\n');
    } else if (message) {
        // Handle other types of JSON messages (if any)
    } else {
        // Handle non-JSON data (raw terminal output)
        term.write(event.data);  // Just write the raw data from the terminal
    }
};

// Function to generate a random folder name for each session
function generateRandomFolderName() {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

// Function to send all files from the editor sessions as a zip to the container
async function sendAllFiles() {
    if (!containerId) {
        console.log('Container ID not yet received. Waiting...');
        return;
    }

    const folderName = generateRandomFolderName(); // Generate random folder name
    const zip = new JSZip(); // Initialize JSZip object

    // Collect files and add to ZIP
    const editors = document.querySelectorAll("#editor > div");
    editors.forEach(editorDiv => {
        const editorDivId = editorDiv.id;
        if (editorSessions[editorDivId]) {
            const content = editorSessions[editorDivId].getValue();
            const tab = document.querySelector(`#editor-${editorDivId.split('-')[2]}`);
            const fileNameElement = tab.querySelector('a');
            const fileName = fileNameElement ? fileNameElement.textContent.trim() : `Untitled_${editorDivId.split('-')[2]}.txt`;
            zip.file(`${folderName}/${fileName}`, content);
        }
    });

    try {
        const zipContent = await zip.generateAsync({ type: "blob" });
        const arrayBuffer = await zipContent.arrayBuffer(); // Convert to ArrayBuffer for binary transfer

        // Send file data as binary WebSocket message
        ws.send(
            JSON.stringify({
                type: 'file',
                containerId: containerId,
                fileName: `${folderName}.zip`,
                fileData: Array.from(new Uint8Array(arrayBuffer)), // Send as Array-like object
            })
        );

        console.log('ZIP file sent to the container:', `${folderName}.zip`);
    } catch (error) {
        console.error("Error while sending ZIP file:", error);
    }
}


// Handle WebSocket errors
ws.onerror = function(error) {
    term.write('\r\nWebSocket Error: ' + error + '\r\n');
};

// Handle WebSocket closure
ws.onclose = function() {
    term.write('\r\nConnection closed\r\n');
};
