
    console.log("hello-world");

    // Initialize WebSocket and Terminal
    const ws = new WebSocket('ws://localhost:8080');
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

    // Open WebSocket connection to the server
    ws.onopen = () => {
        console.log('Connected to server');
    };

    // Handle user data input and send to server
    term.onData(data => {
        ws.send(data);
    });

    // Handle incoming WebSocket messages (real-time PTY output)
    ws.onmessage = function(event) {
        term.write(event.data);
    };

    // Handle WebSocket errors
    ws.onerror = function(error) {
        term.write('\r\nWebSocket Error: ' + error + '\r\n');
    };

    // Handle WebSocket closure
    ws.onclose = function() {
        term.write('\r\nConnection closed\r\n');
    };

