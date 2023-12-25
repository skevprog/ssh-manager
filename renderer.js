const os = require('os');
const path = require('path');
const fs = require('fs');

const homeDirectory = os.homedir();
const sshDirectory = path.join(homeDirectory, process.env.SSH_DIRECTORY);

document.getElementById('btn').addEventListener('click', () => {
    try {
        const files = fs.readdirSync(sshDirectory);

       const publicSshFiles = files.filter((file) => file.endsWith('.pub'));

       document.getElementById('files-location').innerText = publicSshFiles.join('\n');

    } catch(e) {
        console.error('Error reading directory: ', e)
    }
});
