const os = require("os");
const path = require("path");
const fs = require("fs");
var exec = require("child_process").exec;

const homeDirectory = os.homedir();
const sshDirectory = path.join(homeDirectory, process.env.SSH_DIRECTORY);
const copySshKeyCommand = (directory, sshKeyName) => `cat ${directory}/${sshKeyName} | pbcopy`

document.getElementById("btn").addEventListener("click", () => {
  try {
    const files = fs.readdirSync(sshDirectory);
    const publicSshFiles = files.filter((file) => file.endsWith(".pub"));

    const generalList = document.getElementById("files-location");

    publicSshFiles.forEach((pubSshKey) => {
      const li = document.createElement("li");
      generalList.appendChild(li).innerText = pubSshKey;
      li.onclick = () => {
        let child;

        child = exec(
        copySshKeyCommand(sshDirectory, pubSshKey),
          function (error, stdout, stderr) {
            console.log("stdout: " + stdout);
            if (error !== null) {
              console.log("exec error: " + error);
            }
          }
        );
      };
    });
  } catch (e) {
    console.error("Error reading directory: ", e);
  }
});
