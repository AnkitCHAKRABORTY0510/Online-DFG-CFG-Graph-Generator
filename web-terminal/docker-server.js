const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');

const createContainer = (callback) => {
    const containerId = uuidv4();
    exec(`docker run -d --name ${containerId} docker-terminal-llvm tail -f /dev/null`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error creating container: ${stderr}`);
            callback(error);
            return;
        }
        console.log(`Created container: ${containerId}`);
        callback(null, containerId);
    });
};

const deleteContainer = (containerId, callback) => {
    exec(`docker rm -f ${containerId}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error deleting container: ${stderr}`);
            callback(error);
            return;
        }
        console.log(`Deleted container: ${containerId}`);
        callback(null);
    });
};

module.exports = { createContainer, deleteContainer };
